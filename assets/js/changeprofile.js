let token = getCookie("AuthToken");

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/psychologist',
        dataType: 'JSON',
        beforeSend: setHeader,
        // headers: {
        //     'X-Access-Token': token,
        // },

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            console.log(data[0].email);
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