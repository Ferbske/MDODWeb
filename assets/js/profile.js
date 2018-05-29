let token = getCookie("AuthToken");

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/psychologist',
        dataType: 'JSON',
        beforeSend: setHeader,

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            document.getElementById("lblvoornaam").innerHTML = data[0].firstname;
            document.getElementById("lbltussenvoegsel").innerHTML = data[0].infix;
            document.getElementById("lblachternaam").innerHTML = data[0].lastname;
            document.getElementById("lbltelefoonnummer").innerHTML = data[0].phonenumber;
            document.getElementById("lbllocatie").innerHTML = data[0].job_location;
        },
        error: function (data, textStatus, error ) {
            console.log(error + "ERROR!");
        },
        complete: function(xhr, textStatus) {
            console.log(xhr.status);
        }
    });
});

function setHeader(xhr) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.setRequestHeader('X-Access-Token', token);
}