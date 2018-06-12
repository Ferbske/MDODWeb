let token = getCookie("AuthToken");
let substances;

function usageclient() {
    let email = getParameterByName("email");
    let txt = "<tr id='usage_head'>" +
        "<th class='usage_date'>Datum</th>" +
        "<th class='usage_substance'>Wat</th>" +
        "<th class='usage_amount'>Hoeveel</th>" +
        "<th class='usage_location'>Waar</th>" +
        "<th class='usage_cause'>Oorzaak</th>" +
        "<th class='usage_mood'>Gevoel <br><span style='font-size: 10px'>(Schaal van 1 tm 5)</span></th>" +
        "</tr>";
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
            for (let x in data) {
                let id = data[x].substanceId - 1;
                let substance = substances[id].name;
                txt += "<tr id='usage_data" + x + "'>" +
                    "<td class='usage_date'>" + data[x].usedAt.substring(0,10) + "</td>" +
                    "<td class='usage_substance'>" + substance + "</td>" +
                    "<td class='usage_amount'>" + data[x].amount + "</td>" +
                    "<td class='usage_location'>" + data[x].location + "</td>" +
                    "<td class='usage_cause'>" + data[x].cause + "</td>" +
                    "<td class='usage_mood'>" + data[x].mood + "</td>" +
                    "</tr>";
                x++;
            }

            document.getElementById("usage_body").innerHTML = txt;
        },
        error: function (data, textStatus, error) {
            console.log(error);
            document.getElementById("usage_body").innerHTML = txt;
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