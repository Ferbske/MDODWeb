// API Call functions
//==========================================================
function addictionclient() {
    let email = getParameterByName("email");
    $.ajax({
        type: 'PUT',
        url: 'https://mdod.herokuapp.com/api/v1/addiction',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            let x = 0, txt = "";
            for (x in data) {
                txt += "<tr id='tablerow" + x + "'>" +
                    "<td>" + data[x].substance + "</td>" +
                    "</tr>";
                x++;
            }
            document.getElementsByClassName("tbody_addiction")[0].innerHTML = txt;
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

function addAddictionToClient() {
    let email = getParameterByName("email");
    console.log("Supplied email: " + email);

    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/addiction/single_client',
        beforeSend: setHeader,
        dataType: 'JSON',
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log(data[0]);
            console.log("Succes");
        },
        error: function (data, textStatus, error) {
            console.log(error);
            console.log("ERRORRRRR")
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

function tableAllSubstances() {
    let txt = "";
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/v1/substance/all',
        beforeSend: setHeader,
        dataType: 'JSON',

        success: function (data, testStatus, xhr) {
            for (let i in data) {
                txt += "<li>" +
                    "<input type='checkbox' id=''>" +
                    data[i].name +
                    "</li>"
            }
            document.getElementsByClassName("substance_list")[0].innerHTML = txt;

            console.log(data);
        },
        error: function (data, textStatus, xhr) {
            console.log("Error" + textStatus);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);

        }
    })
}

function getSelectedSubstances() {
    console.log("test");
}

function createAddiction(substance) {
    let email = getParameterByName("email");
    let substanceId = substance.id;

    console.log("SUBSTANCEID: " + substanceId);

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
            console.log("created addiction for substance: " + substance);
        },
        error: function (data, textStatus, xhr) {
            console.log("Error:" + textStatus);
        }

    })
}



tableAllSubstances();

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