// This function redirects the page to /client?mail= with the mail from the selected client
function redirectaddiction(email){
    email = getParameterByName("email");
    window.location = "addiction?email=" + email;
}

function redirect(email){
    window.location = "client?email=" + email;
}

function redirectclient(email){
    email = getParameterByName("email");
    window.location = "client?email=" + email;
}


// This function redirects the page to /client?mail= with the mail from the selected client
function redirectdifficultmoment(email){
    email = getParameterByName("email");
    window.location = "difficultmoment?email=" + email;
}

function redirectusage(email){
    email = getParameterByName("email");
    window.location = "usage?email=" + email;
}

function redirectusagechart(email) {
    email = getParameterByName("email");
    window.location = "usagechart?email=" + email;
}

function redirectmood(email){
    email = getParameterByName("email");
    window.location = "mood?email=" + email;
}

function redirectmoodchart(email) {
    email = getParameterByName("email");
    window.location = "moodchart?email=" + email;
}

function redirectnotes(email){
    email = getParameterByName("email");
    window.location = "notes?email=" + email;
}

function redirectcreatenote(email){
    email = getParameterByName("email");
    window.location = "notescreate?email=" + email;
}

function redirectupdatenote(id){
    email = getParameterByName("email");
    window.location = "notesupdate?email=" + email + "&id=" + id;
}

function redirectmessages() {
    let email = getParameterByName("email");
    window.location = "messages?email=" + email;
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