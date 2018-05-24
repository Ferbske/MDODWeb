$(document).ready(function() {
    $('form').on('submit', function () {
        let email = $("#inputEmailLogin").val();
        let password = $("#inputPasswordLogin").val();
        alert("submitted")

        $.ajax({
            type: 'POST',
            url: 'https://mdod.herokuapp.com/api/login/psychologist',
            data: {
                "email": email,
                "password": password
            },
            dataType: 'JSON',
            success: function (data, textStatus, xhr) {
                alert(xhr.status + " | success");
            },
            error: function (data, textStatus, error ) {
                alert("failed")
            },
            complete: function(xhr, textStatus) {
                alert(xhr.status);
            }
        });
        return false;

    });
})