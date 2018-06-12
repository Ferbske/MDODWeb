let token = getCookie("AuthToken");

function notesclient() {
    let email = getParameterByName("email");
    let txt = "<tr id='notes_head'>" +
        "<th class='notes_description'>Descriptie</th>" +
        "</tr>";
    $.ajax({
        type: '',
        url: '',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            for (let x in data) {
                txt += "<tr id='notes_data" + x + "'>" +
                    "<td class='notes_description'>" + data[x].description + "</td>" +
                    "</tr>";
                x++;
            }

            document.getElementById("notes_body").innerHTML = txt;
        },
        error: function (data, textStatus, error) {
            console.log(error);
            document.getElementById("notes_body").innerHTML = txt;
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