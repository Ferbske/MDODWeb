function getAllUsages() {
    $.ajax({
        type: 'DELETE',
        url: 'https://mdod.herokuapp.com/api/v1/addiction/',
        beforeSend: setHeader,
        dataType: 'JSON',
        data: {
            'substanceId': substanceId,
            'email': email
        },

        success: function (data, textStatus, xhr) {
            console.log('succes');
        },
        error: function (data, textStatus, xhr) {
            console.log("error on getting substances")
        }
    })
}



//=======================================//
// Helper functions
function setHeader(xhr) {
    let token = getCookie("AuthToken");
    // Set Authorization header
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//=======================================//