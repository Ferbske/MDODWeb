let token = getCookie("AuthToken");

function usageclient() {
    let email = getParameterByName("email");
    let txthead = "<tr id='usage_head'>" +
        "<th class='usage_date'>Datum</th>" +
        "<th class='usage_substance'>Wat</th>" +
        "<th class='usage_amount'>Hoeveel</th>" +
        "<th class='usage_location'>Waar</th>" +
        "<th class='usage_cause'>Oorzaak</th>" +
        "<th class='usage_mood'>Gevoel <br><span style='font-size: 10px'>(Schaal van 1 tm 5)</span></th>" +
        "</tr>";

    document.getElementById("usage_head").innerHTML = txthead;

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

            let txt = "";
            for (let x in data) {
                txt += "<tr id='usage_data" + x + "'>" +
                    "<td class='usage_date'>" + data[x].usedAt.substring(0,10) + "</td>" +
                    "<td class='usage_substance'>" + data[x].name + "</td>" +
                    "<td class='usage_amount'>" + data[x].amount + "</td>" +
                    "<td class='usage_location'><span style='text-transform: capitalize'>" + data[x].location + "</span></td>" +
                    "<td class='usage_cause'>" + data[x].cause + "</td>" +
                    "<td class='usage_mood'>" + data[x].mood + "</td>" +
                    "</tr>";
                x++;
            }

            document.getElementById("usage_body").innerHTML = txt;
            document.getElementById("loading").style.display = "none";
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

usageclient();