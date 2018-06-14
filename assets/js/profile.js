let token = getCookie("AuthToken");

// This function gets the name, phonennumber and location of the psychologist from the API
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/psychologist',
        dataType: 'JSON',
        beforeSend: setHeader,

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            // Fill firstname header in profile.ejs
            document.getElementById("lblvoornaam").innerHTML = "<span style='text-transform: capitalize;'>" + data[0].firstname + "</span>";
            // Fill infix header in profile.ejs
            document.getElementById("lbltussenvoegsel").innerHTML = "<span style='text-transform: lowercase;'>" + data[0].infix + "</span>";
            // Fill lastname header in profile.ejs
            document.getElementById("lblachternaam").innerHTML = "<span style='text-transform: capitalize;'>" + data[0].lastname + "</span>";
            // Fill phonenumber header in profile.ejs
            document.getElementById("lbltelefoonnummer").innerHTML = data[0].phonenumber;
            // Fill location header in profile.ejs
            document.getElementById("lbllocatie").innerHTML = data[0].job_location;


            document.getElementById("loading").style.display = "none";
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
}