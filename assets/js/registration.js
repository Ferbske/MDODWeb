// This function gets the firstname, infix, lastname, phonenumber, location, email and password from the input field at the register page
// and does a post request at the API server to register

$(document).ready(function() {
    $('form').on('submit', function () {
        let firstname = $("#inputVoornaam").val();
        let infix = $("#inputTussenvoegsel").val();
        let lastname = $("#inputAchternaam").val();
        let phonenumber = $("#inputTelefoonnummerRegister").val();
        let location = $("#inputLocatieRegister").val() + "";
        let email = $("#inputEmailRegister").val();
        let password = $("#inputWachtwoordRegister").val();

        if (!infix) {
            infix = "";
        }

        $.ajax({
            type: 'POST',
            url: 'https://mdod.herokuapp.com/api/register/psychologist',
            data: {
                "firstname": firstname,
                "infix": infix,
                "lastname": lastname,
                "phonenumber": phonenumber,
                "location": location,
                "email": email,
                "password": password
            },
            dataType: 'JSON',

            success: function (data, textStatus, xhr) {
                // Redirect the user to the login page after a successful registration
                alert("Uw account is succesvol aangemaakt, u wordt nu doorgestuurd naar de inlog-pagina");
                window.location.href = "/login"
            },
            error: function (data, textStatus, error ) {
                if (error === "Conflict") {
                    alert("Dit emailadres is niet beschikbaar")
                } else {
                    console.log(error);
                    console.log(textStatus);
                }
            },
            complete: function(xhr, textStatus) {
                console.log(xhr.status);
            }
        });
        return false;

    });
});