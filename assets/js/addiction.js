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
            document.getElementsByClassName("tbody")[0].innerHTML = txt;
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

function getAddictionFromClient() {
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
            let txt = "";
            for (let x in data) {
                txt += "<tr id='tablerow" + x + "'>" +
                    "<td>" + data[x].name + "</td>" +
                    "</tr>";
            }
            document.getElementsByClassName("tbody")[0].innerHTML = txt;
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