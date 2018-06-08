let token = getCookie("AuthToken");
let substances;

function usageclient() {
    let email = getParameterByName("email");
    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/usage/client/data',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            let txt = "<tr id='usage_head'>" +
                "<th>Wat</th>" +
                "<th>Beschrijving</th>" +
                "<th>Datum</th>" +
                "</tr>";
            for (let x in data) {
                let id = data[x].substanceId - 1;
                let substance = substances[id].name;
                txt += "<tr id='usage_data" + x + "'>" +
                    "<td>" + substance + "</td>" +
                    "<td>" + data[x].description + "</td>" +
                    "<td>" + data[x].usedAt.substring(0,10) + "</td>" +
                    "</tr>";
                x++;
            }

            document.getElementById("usage_body").innerHTML = txt;
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

function allsubstances(){
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/v1/substance/all',
        dataType: 'JSON',
        beforeSend: setHeader,

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            substances = data;
            setTimeout(1000);
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
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