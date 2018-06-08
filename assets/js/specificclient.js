let token = getCookie("AuthToken");
let email = getParameterByName("email");
let clean = "";
let addictionlist = [];

// Get all addictions from a specific client. builds a table of all addictions on a succesful api-call
function getAddictionFromClient() {
    let email = getParameterByName("email");

    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/addiction/single_client',
        beforeSend: setHeader,
        dataType: 'JSON',
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            for (let x in data) {
                addictionlist.push(data[x].name);
            }
            cleanDays();
        },
        error: function (data, textStatus, error) {
            console.log(error);
            cleanDays();
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}




// This functionn gets info from 1 specific client by email
// it gets the mail from the url
function getInfoClient(addictionlist, clean) {
    let email = getParameterByName("email");

    $.ajax({
        type: 'POST',
        url: "https://mdod.herokuapp.com/api/v1/specific/client",
        dataType: 'JSON',
        data: {"email": email},
        beforeSend: setHeader,

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            let x = 0, txt = "";
            let contact = data[x].contact || "";
            for (x in data) {
                document.getElementById("clientname").innerHTML = data[x].firstname + " " + data[x].infix + " " + data[x].lastname;
                txt +=
                    "<tr>" +
                        "<th>Email:</th>" +
                        "<td id='clientEmail'>" + data[x].email + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Naam:</th>" +
                        "<td id='clientName'>" + data[x].firstname + " " +
                        data[x].infix + " " +
                        data[x].lastname + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Adres:</th>" +
                        "<td id='clientAddress'>" + data[x].adress + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Postcode:</th>" +
                        "<td id='clientZipcode'>" + data[x].zipcode + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Woonplaats:</th>" +
                        "<td id='clientCity'>" + data[x].city + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Geboortedatum:</th>" +
                        "<td id='clientBirthday'>" + data[x].birthday.substring(0, 10) + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Telefoonnummer:</th>" +
                        "<td id='clientPhonenumber'>" + data[x].phonenumber + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Contact:</th>" +
                        "<td id='clientContact'>" + contact + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Dagen Clean:</th>" +
                        "<td id='clientClean'>" + clean + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Verslavingen:</th>" +
                        "<td id='clientAddiction'>" + addictionlist + "</td>" +
                    "</tr>";
                x++;
            }
            document.getElementById("client_body").innerHTML = txt;

            // This section removes the button if the contact field is filled out
            let contactField = data[0].contact;
            // Check if the contactfield has a value of a string
            if (contactField) {
                console.log("Waarde: " + contactField);
                $('#treatclientbutton').remove();
            } else {
                $('#untreatclientbutton').remove();
            }
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    });
}

function cleanDays() {
    $.ajax({
        type: 'POST',
        url: "https://mdod.herokuapp.com/api/v1/usage/client/data/clean/status",
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            clean = data.daysClean;
            getInfoClient(addictionlist, clean)
        },
        error: function (data, textStatus, error) {
            console.log(error);
            getInfoClient(addictionlist)
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    });
}

function setHeader(xhr) {
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

getAddictionFromClient();
