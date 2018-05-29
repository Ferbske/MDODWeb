// This function creates a Cookie that needs 3 parameters:
// cname is the name you want the cookie to be called
// cvalue is the value what it should store
// exhours are the amount of our the it should be kept before it expires
function setCookie(cname, cvalue, exhours) {
    let d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// This function retrieves a Cookie by the name it has been given by the previous function
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// The function gives back a String with all the cookies that are currently created
// when you call this function
function listCookies() {
    let theCookies = document.cookie.split(';');
    let aString = '';
    for (let i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}