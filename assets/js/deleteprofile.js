// let token = getCookie("AuthToken");

function deletePsychologist() {
    $.ajax({
        type: 'DELETE',
        url: 'https://mdod.herokuapp.com/api/psychologist',
        dataType: 'JSON',
        beforeSend: setHeader,

        success: function (data, textStatus, xhr) {
            alert("Account succesvol verwijderd, u wordt nu doorgestuurd naar de login pagina.");
            window.location.href = '/login';
        },
        error: function (data, textStatus, error ) {
            console.log("Error " + error);
        },
        complete: function(xhr, textStatus) {
            // Log the status returned by the server
            console.log(xhr.status);
        }
    });
};

function setHeader(xhr) {
    // Set Authorization header
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    // Set X-Access-Token header
    xhr.setRequestHeader('X-Access-Token', token);
}