let token = getCookie("AuthToken");
// let firstname = " ";
// let lastname = " ";
// let infix = " ";
// let phonenumber = " ";
// let location = " ";

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/psychologist',
        dataType: 'JSON',
        beforeSend: setHeader,

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            console.log(data[0].email);
            // Fill firstname input field
            document.getElementById("inputVoornaam").value = data[0].firstname;
            // Fill infix if present
            document.getElementById("inputTussenvoegsel").value = data[0].infix;
            // Fill lastname input field
            document.getElementById("inputAchternaam").value = data[0].lastname;
            // Fill phonenumber input field
            document.getElementById("inputTelefoonnummer").value = data[0].phonenumber;
            // Fill location input field
            document.getElementById("inputLocatie").value = data[0].job_location;

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