// This function redirects the page to /client?mail= with the mail from the selected client
function redirectdifficultmoment(email){
    email = getParameterByName("email");
    window.location = "difficultmoment?email=" + email;
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