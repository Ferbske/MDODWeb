// API Call functions
// CHECK ALL CURRENT ADDICTIONS
let uncheckedSubstances = [];
let checkedSubstances = [];
let email = getParameterByName("email");

function addToUnselectedSubstances (checkbox) {
    if (!document.getElementById(checkbox.id).checked) {
        uncheckedSubstances.push(checkbox.id)
    } else {
        checkedSubstances.push(checkbox.id)
    }
}

function checkAddictionsCheckbox() {
    let allClientAddictions = [];
    let email = getParameterByName("email");
    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/addiction/single_client',
        beforeSend: setHeader,
        dataType: 'JSON',
        data: {
            "email" : email
        },

        success: function (data, textStatus, xhr) {
            document.getElementById("loading").style.display = "none";
            for (let addiction in data) {
                allClientAddictions.push(data[addiction].substanceId);
            }

                // Loop over all checkboxes
            $("input:not(checked)").each(function () {
                for (let addiction in allClientAddictions) {
                    // Check if the ID of the checkbox is equal to the SubstanceID of the addiction
                    if ($(this).attr('id') == allClientAddictions[addiction]) {
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
// Get all available substances from the database
function tableAllSubstances() {
    let txt = "";
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/v1/substance/all',
        beforeSend: setHeader,
        dataType: 'JSON',

        success: function (data, testStatus, xhr) {
            // Loop through all substances and create a checklist of them
            for (let i in data) {
                txt += "<li>" +
                    "<input type='checkbox' onclick='addToUnselectedSubstances(this)' id='" + data[i].id + "' name='" + data[i].name + "'" + ">" +
                    data[i].name +
                    "</li>";
            }
            document.getElementsByClassName("substance_list")[0].innerHTML = txt;
            checkAddictionsCheckbox();
        },
        error: function (data, textStatus, xhr) {
            console.log("Error" + textStatus);
        },
    })
}

// Get all the checked substances
// function handleSelectedSubstances() {
//     let selectedSubstances = [];
//
//     // Add every checked substance to the selectedSubstances array
//     $("input:checked").each(function () {
//         selectedSubstances.push($(this).attr("id"))
//     });
//
//     $("input:not(checked)").each(function () {
//         unselectedSubstances.push($(this).attr("id"))
//     });
//
//     // Loop through the selectedSubstances array and create a new addiction for every substance
//     for (let substanceId in selectedSubstances) {
//         createAddiction(selectedSubstances[substanceId]);
//     }
//
//     // Loop through the selectedSubstances array and try to remove them from the database
//     for (let substanceId in unselectedSubstances) {
//         removeAddiction(unselectedSubstances[substanceId]);
//     }
// }

function handleSelectedSubstances() {
    for (let substanceID in checkedSubstances) {
        createAddiction(checkedSubstances[substanceID]);
    }

    for (let substanceID in uncheckedSubstances) {
        removeAddiction(uncheckedSubstances[substanceID]);
    }
    alert("Wijzigingen doorgevoerd, u wordt nu doorgestuurd naar de cliënt-pagina");
    returnToPreviousPage();
}

function returnToPreviousPage() {
    window.location = "client?email=" + email;
}

// Get all unselected substances

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
//=======================================//
// Helper functions
function setHeader(xhr) {
    let token = getCookie("AuthToken");
    // Set Authorization header
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

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