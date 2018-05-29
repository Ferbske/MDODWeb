// This function gets the email and password from the input field at the login page
// and does a post request at the API server to login

$(document).ready(function() {
    $('form').on('submit', function () {
        let email = $("#inputEmailLogin").val();
        let password = $("#inputPasswordLogin").val();

        $.ajax({
            type: 'POST',
            url: 'https://mdod.herokuapp.com/api/login/psychologist',
            data: {
                "email": email,
                "password": password
            },
            dataType: 'JSON',

            success: function (data, textStatus, xhr) {
                console.log("User token: " + data.token);
                let token = data.token;
                // Redirect the user to the dashboard after a successful login
                location.href = "/dashboard";
            },
            error: function (data, textStatus, error ) {
                if (error === "Not Found") {
                    alert("Het opgegeven emailadres bestaat niet of is foutief ingevoerd");
                    location.reload();
                } else if (error === "Unauthorized") {
                    alert("Het opgegeven wachtwoord is onjuist");
                    location.reload();
                }
            },
            complete: function(xhr, textStatus) {
                console.log(xhr.status);
            }
        });
        return false;

    });
})