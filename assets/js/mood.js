let token = getCookie("AuthToken");

function moodclient() {
    let email = getParameterByName("email");
    let txthead = "<tr id='notes_head'>" +
        "<th class='mood_date'>Datum</th>" +
        "<th class='mood_description'>Descriptie</th>" +
        "<th class='mood_mood'>Gevoel <br><span style='font-size: 10px'>(Schaal van 1 tm 5)</span></th>" +
        "</tr>";

    document.getElementById("mood_head").innerHTML = txthead;

    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/mood/client',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");

            let txt = "";
            for (let x in data) {
                txt += "<tr>" +
                    "<td class='mood_date'>" + data[x].addedDate.substring(0,10) + "</td>" +
                    "<td class='mood_description'>" + data[x].description + "</td>" +
                    "<td class='mood_mood'>" + data[x].value + "</td>" +
                    "</tr>";
                x++;
            }

            document.getElementById("mood_body").innerHTML = txt;
        },
        error: function (data, textStatus, error) {
            console.log(error);
            document.getElementById("mood_body").innerHTML = txt;
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

moodclient();