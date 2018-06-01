function treatclient() {
    let clientEmail = getParameterByName("email");
    $.ajax({
        type: 'PUT',
        url: 'https://mdod.herokuapp.com/api/v1/pickclient',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": clientEmail
        },

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            alert("U heeft de cliënt in behandeling genomen");
            window.location.reload();
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
};

function setHeader(xhr) {
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