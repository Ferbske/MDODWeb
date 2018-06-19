let token = getCookie("AuthToken");

// This function gets all clients from the api that are in treatment by
// the specific logged in psychologist and puts them in an table in the html with an id of "tableClients"
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/v1/clients-by-psychologist',
        dataType: 'JSON',
        beforeSend: setHeader,

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            let x = 0, txt = "";
            for (x in data) {
                txt += "<tr id='tclients_row" + x + "' onclick=redirect('" + data[x].email + "')>" +
                    "<th><span style='text-transform: capitalize;'>" + data[x].firstname + "</span> " +
                    "<span style='text-transform: lowercase;'>" + data[x].infix + "</span> " +
                    "<span style='text-transform: capitalize;'>" + data[x].lastname + "</span></th>" +
                    "<td>" + data[x].email + "</td>" +
                    "</tr>";
                x++;
            }
            document.getElementById("tclients_body").innerHTML = txt;
            document.getElementById("loading").style.display = "none";
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