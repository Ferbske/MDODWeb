$(document).ready(function() {
    $('form').on('submit', function () {
        let firstname = $("#inputVoornaam").val();
        let infix = $("#inputTussenvoegsel").val() + " ";
        let lastname = $("#inputAchternaam").val();
        let phonenumber = $("#inputTelefoonnummerRegister").val();
        let location = $("#inputLocatieRegister").val();
        let email = $("#inputEmailLogin").val();
        let password = $("#inputPasswordLogin").val();

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
                // Redirect the user to the login page after a successfull login
                console.log(xhr.status);
                location.href = "/"
            },
            error: function (data, textStatus, error ) {
                console.log(error);
                console.log(textStatus);
                console.log(data.firstname);
            },
            complete: function(xhr, textStatus) {
                console.log(xhr.status);
            }
        });
        return false;

    });
});