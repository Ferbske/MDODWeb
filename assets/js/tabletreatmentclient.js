let token = getCookie("AuthToken");

// This function gets all clients from the api and puts them in an table in the html with an id of "tableClients"
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/v1/clients-by-psychologist',
        dataType: 'JSON',
        beforeSend: setHeader,

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            let x = 0, txt = "";
            txt += "<table border='1'>";
            for (x in data) {
                txt += "<tr id='tablerow" + x + "'>" +
                    "<td>" + data[x].email + "</td>" +
                    "<td>" + data[x].firstname + " " +
                    data[x].infix + " " +
                    data[x].lastname + "</td>" +
                    "<td><button onclick=redirect('" + data[x].email + "') class='btn btn-lg btn-primary'>Bekijk Client</button></td>" +
                    "</tr>";
                x++;
            }
            txt += "</table>";
            document.getElementById("tableClients").innerHTML = txt;
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    });
});

function setHeader(xhr) {
    // Set Authorization header
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    // Set X-Access-Token header
    xhr.setRequestHeader('X-Access-Token', token);
}