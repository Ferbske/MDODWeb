// API Call functions
// CHECK ALL CURRENT ADDICTIONS

// Array for storing all unchecked checkboxes
let uncheckedSubstances = [];
// Array for storing all checked checkboxes
let checkedSubstances = [];
// The emailaddress of the client
let email = getParameterByName("email");

// This function checks if a checkbox is checked
function addToSubstanceArray (checkbox) {
    // If the checkbox is unchecked it is added to the uncheckSubstances array
    if (!document.getElementById(checkbox.id).checked) {
        uncheckedSubstances.push(checkbox.id)
        // If a checkbox is checked, it is added to the checkedSubstances array
    } else {
        checkedSubstances.push(checkbox.id)
    }
}

// This function checks all the substance-checkboxes for which a client has an addiction
function checkAddictionsCheckbox() {
    let allClientAddictions = [];
    let email = getParameterByName("email");
    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/addiction/single_client',
        beforeSend: setHeader, //This is a function which sets the authorization header, declared at the bottom of the document
        dataType: 'JSON',
        data: {
            "email" : email
        },

        success: function (data, textStatus, xhr) {
            // Loop over the returned data and add the substanceId's to the allClientAddictions array
            for (let addiction in data) {
                allClientAddictions.push(data[addiction].substanceId);
            }
            // Loop over all checkboxes
            $("input:not(checked)").each(function () {
                for (let addiction in allClientAddictions) {
                    // Check if the ID of the checkbox is equal to the SubstanceID of the addiction
                    if ($(this).attr('id') == allClientAddictions[addiction]) {
                        // If the checkboxID is equal to the SubstanceID, set the checkbox to checked
                        $(this).prop('checked', true);
                    }
                }
            })
        },
        error: function (data, textStatus, error ) {
            console.log(error);
        },
    });
}

//==========================================================
// Get all available substances from the database and create a list of checkboxes with these substances
function tableAllSubstances() {
    let html = "";
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/v1/substance/all',
        beforeSend: setHeader,
        dataType: 'JSON',

        success: function (data, testStatus, xhr) {
            // Loop through all substances and create a checklist of them
            for (let x in data) {
                html += "<li>" +
                    "<input type='checkbox' onclick='addToSubstanceArray(this)' id='" + data[x].id + "' name='" + data[x].name + "'" + ">" +
                    data[x].name +
                    "</li>";
            }
            document.getElementsByClassName("substance_list")[0].innerHTML = html;
            // Call checkAddictionsCheckbox after creating the checklist. This function checks all substances for which the client has an addiction
            checkAddictionsCheckbox();
        },
        error: function (data, textStatus, xhr) {
            console.log("Error" + textStatus);
        },
    })
}

// This function creates or deletes addictions for a client
function handleSelectedSubstances() {
    /* Loop over the checkedSubstances list.
    For every substance that has been checked by the user, the createAddiction() function is called. This function
    calls and API-endpoint which creates a new addiction in the database
     */
    for (let substanceID in checkedSubstances) {
        createAddiction(checkedSubstances[substanceID]);
    }
    /* Loop over the uncheckedSubstances list.
    For every substance that has been checked by the user, the deleteAddiction() function is called. This function
    calls and API-endpoint which deletes an addiction from the database
     */
    for (let substanceID in uncheckedSubstances) {
        removeAddiction(uncheckedSubstances[substanceID]);
    }
    // Show a message to the user after clicking the "Opslaan" button in the addictions.ejs view
    alert("Wijzigingen doorgevoerd, u wordt nu doorgestuurd naar de cliënt-pagina");
    // Return to the client page
    returnToClientPage();
}

function returnToClientPage() {
    window.location = "client?email=" + email;
}

// This function creates a new addiction in the database by calling the API-Endpoint /addiction
function createAddiction(substanceId) {
    let email = getParameterByName("email");
    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/addiction',
        beforeSend: setHeader,
        dataType: 'JSON',
        data: {
            'substanceId': substanceId,
            'email': email
        },

        success: function (data, textStatus, xhr) {
            console.log("created addiction for substance: " + substanceId);
        },
        error: function (data, textStatus, xhr) {
            console.log("Error while creating addiction");
        }

    })
}

// This function deletes an addiction from the database by calling the API-Endpoint /addiction
function removeAddiction(substanceId) {
    let email = getParameterByName("email");
    $.ajax({
        type: 'DELETE',
        url: 'https://mdod.herokuapp.com/api/v1/addiction/',
        beforeSend: setHeader,
        dataType: 'JSON',
        data: {
            'substanceId': substanceId,
            'email': email
        },

        success: function (data, textStatus, xhr) {
            console.log('Addiction deleted');
        },
        error: function (data, textStatus, xhr) {
            console.log("error on deleting")
        }
    })
}
//==========================
// Helper functions
//==========================
function setHeader(xhr) {
    let token = getCookie("AuthToken");
    // Set Authorization header
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

// This functions extracts the emailaddress of the client from the URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//=======================================//

// Calling defined functions //
tableAllSubstances();