// API Call functions
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
                    "<input type='checkbox' id='" + data[i].id + "' name='" + data[i].name + "'" + ">" +
                    data[i].name +
                    "</li>";
            }
            document.getElementsByClassName("substance_list")[0].innerHTML = txt;
        },
        error: function (data, textStatus, xhr) {
            console.log("Error" + textStatus);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

// Get all the checked substances
function handleSelectedSubstances() {
    let selectedSubstances = [];
    let unselectedSubstances = [];

    // Add every checked substance to the selectedSubstances array
    $("input:checked").each(function () {
        selectedSubstances.push($(this).attr("id"))
    });

    $("input:not:checked").each(function () {
        unselectedSubstances.push($(this).attr("id"))
    });

    // Loop through the selectedSubstances array and create a new addiction for every substance
    for (let substanceId in selectedSubstances) {
        createAddiction(selectedSubstances[substanceId]);
    }

    // Loop through the selectedSubstances array and try to remove them from the database
    for (let substanceId in unselectedSubstances) {
        removeAddiction(selectedSubstances[substanceId]);
    }
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
            window.location = "client?email=" + email;
        },
        error: function (data, textStatus, xhr) {
            console.log("SubstanceID: " + substanceId);
            console.log("Email: " + email);
            console.log("Error:" + textStatus);
            console.log(data);
        }

    })
}

function removeAddiction (substanceId) {
    let email = getParameterByName("email");
    $.ajax({
        type: 'DELETE',
        url: 'https://mdod.herokuapp.com/api/v1/addiction',
        beforeSend: setHeader,
        dataType: 'JSON',
        data: {
            'substanceId': substanceId,
            'email': email
        },

        success: function (data, textStatus, xhr) {
            console.log('Great succes' + data);
        },
        error: function (data, textStatus, xhr) {
            console.log('Error');
            console.log(data);
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