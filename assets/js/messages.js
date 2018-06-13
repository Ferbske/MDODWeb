function tableAllMessages() {
    let email = getParameterByName("email");
    let txt = "<tr>" +
        "<th>Afzender</th>" +
        "<th>Bericht</th>" +
        "<th>Datum</th>" +
        "</tr>";

    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/messages/get/psychologist',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");

            for (let x in data) {
                txt += "<tr id='" + data[x].id + "' onclick=redirectupdatenote(" + data[x].id + ") >" +
                    "<td class='messages_sender'>" + data[x].sendBy + "</td>" +
                    "<td class='messages_message'>" + data[x].message + "</td>" +
                    "<td class='messages_date'>" + data[x].date + "</td>" +
                    "</tr>";
            }
            document.getElementById("tclients_messages").innerHTML = txt;
        },
        error: function (data, textStatus, error) {
            console.log(error);
            document.getElementById("tclients_messages").innerHTML = "";
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

function sendMessage() {
    let email = getParameterByName("email");
    let message = $("#message_input").val();
    console.log(message);
    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/messages/psychologist',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email,
            "message": message
        },

        success: function (data, testStatus, xhr) {
            console.log("Message sent");
            location.reload();
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}


// Helper functions
function setHeader(xhr) {
    // Set Authorization header
    let token = getCookie("AuthToken");
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

// Get the parameter from the url
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}