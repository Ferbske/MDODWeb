let token = getCookie("AuthToken");

// This function gets all clients from the api and puts them in an table in the html with an id of "tableClients"
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/v1/all/client',
        dataType: 'JSON',
        beforeSend: setHeader,

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            let x = 0, txt = "";
            txt += "<table border='1' class='table-striped'>";
            for (x in data) {
                txt += "<tr id='tablerow" + x + "' onclick=redirect('" + data[x].email + "') >" +
                "<td>" + data[x].email + "</td>" +
                "<td>" + data[x].firstname + " " +
                    data[x].infix + " " +
                    data[x].lastname + "</td>" +
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
}