let token = getCookie("AuthToken");

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/psychologist',
        dataType: 'JSON',
        beforeSend: setHeader,

        success: function (data, textStatus, xhr) {
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
            // Log the error
            console.log(error);
        },
        complete: function(xhr, textStatus) {
            // Log the status returned by the server
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