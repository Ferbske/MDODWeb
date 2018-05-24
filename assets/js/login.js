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
                console.log(xhr.status + " | success");
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