let token = getCookie("AuthToken");

// This functionn gets info from 1 specific client by email
// it gets the mail from the url
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
            for (x in data) {
                document.getElementById("clientname").innerHTML = data[x].firstname + " " + data[x].infix + " " + data[x].lastname;
                txt +=
                    "<tr>" +
                        "<th>Email</th>" +
                        "<td>" + data[x].email + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Naam</th>" +
                        "<td>" + data[x].firstname + " " +
                        data[x].infix + " " +
                        data[x].lastname + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Adres</th>" +
                        "<td>" + data[x].adress + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Postcode</th>" +
                        "<td>" + data[x].zipcode + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Woonplaats</th>" +
                        "<td>" + data[x].city + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Geboortedatum</th>" +
                        "<td>" + data[x].birthday + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Telefoonnummer</th>" +
                        "<td>" + data[x].phonenumber + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<th>Contact</th>" +
                        "<td>" + data[x].contact + "</td>" +
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
    });
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