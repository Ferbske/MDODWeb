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
            let txt = "<tr id='dm_head'>" +
                "<th class='dm_date'>Datum</th>" +
                "<th class='dm_substance'>Wat</th>" +
                "<th class='dm_description'>Beschrijving</th>" +
                "<th class='dm_lust'>Trek <br><span style='font-size: 10px'>(schaal van 1 tm 5)</span></th>" +
                "</tr>";
            for (x in data) {
                let date = data[x].date_lust.substring(0, 10);
                txt += "<tr id='dm_data" + x + "'>" +
                    "<td class='dm_date'>" + date + "</td>" +
                    "<td class='dm_substance'>" + data[x].name + "</td>" +
                    "<td class='dm_description'>" + data[x].description + "</td>" +
                    "<td class='dm_lust'>" + data[x].lust + "</td>" +
                    "</tr>";
                x++;
            }
            document.getElementById("dm_body").innerHTML = txt;
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