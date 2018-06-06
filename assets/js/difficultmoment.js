let token = getCookie("AuthToken");

function difficultmoment() {
    let email = getParameterByName("email");
    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/difficult_moment/client',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            let x = 0;
            let txt = "<tr id='tablehead'>" +
            "<td>Wat</td>" +
            "<td>Beschrijving</td>" +
            "<td>Datum</td>" +
            "<td>Trek schaal 1 op 5</td>" +
            "</tr>";
            for (x in data) {
                let date = data[x].date_lust.substring(0, 10);
                txt += "<tr id='tablerow" + x + "'>" +
                    "<td>" + data[x].name + "</td>" +
                    "<td>" + data[x].description + "</td>" +
                    "<td>" + date + "</td>" +
                    "<td>" + data[x].lust + "</td>" +
                    "</tr>";
                x++;
            }
            document.getElementById("tbody").innerHTML = txt;
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