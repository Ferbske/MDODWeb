let token = getCookie("AuthToken");

function getInfoClient() {
    let email = getParameterByName("email");
    $.ajax({
        type: 'POST',
        url: "https://mdod.herokuapp.com/api/v1/specific/client",
        dataType: 'JSON',
        data: { "email": email},
        beforeSend: setHeader,

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            let x = 0, txt = "";
            txt += "<table border='1'><tr>" +
                "<td>Email</td>" +
                "<td>Naam</td>" +
                "<td>Adres</td>" +
                "<td>Postcode</td>" +
                "<td>Stad</td>" +
                "<td>Geboortedatum</td>" +
                "<td>Telefoon</td>" +
                "<td>Contact</td>" +
                "</tr>";
            for (x in data) {
                txt += "<tr id='tablerow" + x + "'>" +
                    "<td>" + data[x].email + "</td>" +
                    "<td>" + data[x].firstname + " " +
                        data[x].infix + " " +
                        data[x].lastname + "</td>" +
                    "<td>" + data[x].adress + "</td>" +
                    "<td>" + data[x].zipcode + "</td>" +
                    "<td>" + data[x].city + "</td>" +
                    "<td>" + data[x].birthday + "</td>" +
                    "<td>" + data[x].phonenumber + "</td>" +
                    "<td>" + data[x].contact + "</td>" +
                    "</tr>";
                x++;
            }
            txt += "</table>";
            document.getElementById("tableClient").innerHTML = txt;
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    });
}

function setHeader(xhr) {
    // Set Authorization header
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    // Set X-Access-Token header
    xhr.setRequestHeader('X-Access-Token', token);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}