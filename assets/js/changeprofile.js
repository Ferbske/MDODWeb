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

    $('form').on('submit', function () {
        let firstname = $("#inputVoornaam").val();
        let infix = $("#inputTussenvoegsel").val();
        let lastname = $("#inputAchternaam").val();
        let phonenumber = $("#inputTelefoonnummer").val();
        let location = $("#inputLocatie").val();

        if (!infix) {
            infix = "";
        }
        console.log(firstname)
        console.log(infix)
        console.log(lastname)
        console.log(phonenumber)
        console.log(location)

// ======================================================================================
// After submit functionality
        $.ajax({
            type: 'PUT',
            url: 'https://mdod.herokuapp.com/api/psychologist',
            data: {
                "firstname": firstname,
                "infix": infix,
                "lastname": lastname,
                "phonenumber": phonenumber,
                "location": location
            },
            dataType: 'JSON',
            beforeSend: setHeader,

            success: function (data, textStatus, xhr) {
                alert("Wijzigingen doorgevoerd!");
                window.location.href = '/profile'
            },
            error: function (data, textStatus, error ) {
                console.log(error);
            },
            complete: function(xhr, textStatus) {
                console.log(xhr.status);
            }
        });
        return false;

    });

});

function setHeader(xhr) {
    // Set Authorization header
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    // Set X-Access-Token header
    xhr.setRequestHeader('X-Access-Token', token);
}