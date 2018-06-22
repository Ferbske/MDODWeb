let token = getCookie("AuthToken");

function notesclient() {
    let email = getParameterByName("email");
    let txt = "";
    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/note/single_client',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            for (let x in data) {
                txt += "<tr id='" + data[x].id + "' onclick=redirectupdatenote(" + data[x].id + ") >" +
                    "<th class='notes_title'>" + data[x].title + "</th>" +
                    "<td class='notes_description'>" + data[x].description + "</td>" +
                    "</tr>";
                x++;
            }

            document.getElementById("notes_body").innerHTML = txt;
            document.getElementById("loading").style.display = "none";
        },
        error: function (data, textStatus, error) {
            console.log(error);
            document.getElementById("notes_body").innerHTML = txt;
            document.getElementById("loading").style.display = "none";
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

function createnoteclient() {
    let email = getParameterByName("email");
    let txthead = $("#note_head").val();
    let txt = $("#note_input").val();
    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/note',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email,
            "title": txthead,
            "description": txt
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            alert("Notitie is aangemaakt");
            window.location.href = "notes?email=" + email;
        },
        error: function (data, textStatus, error) {
            console.log(error);
            alert("Er is iets fout gegaan probeer het opnieuw.")
            location.reload();
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

function singlenoteclient() {
    let email = getParameterByName("email");
    let identifier = getParameterByName("id");
    let txthead = "";
    let txt = "";
    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/note/single_client',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            for (let x in data) {
                if (data[x].id == identifier) {
                    txthead += data[x].title;
                    txt += data[x].description;
                }
            }
            document.getElementById("note_head").value = txthead;
            document.getElementById("note_input").innerHTML = txt;
            document.getElementById("loading").style.display = "none";
        },
        error: function (data, textStatus, error) {
            console.log(error);
            document.getElementById("note_head").innerHTML = txthead;
            document.getElementById("note_input").innerHTML = txt;
            document.getElementById("loading").style.display = "none";
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

function updatenoteclient() {
    let email = getParameterByName("email");
    let txthead = $("#note_head").val();
    let txt = $("#note_input").val();
    let identifier = getParameterByName("id");
    $.ajax({
        type: 'PUT',
        url: 'https://mdod.herokuapp.com/api/v1/note',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "id": identifier,
            "email": email,
            "title": txthead,
            "description": txt
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            window.location.href = "notes?email=" + email;
        },
        error: function (data, textStatus, error) {
            console.log(error);
            alert("Er is iets fout gegaan probeer het opnieuw.")
            location.reload();
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

function deletenoteclient() {
    let email = getParameterByName("email");
    let identifier = getParameterByName("id");
    $.ajax({
        type: 'DELETE',
        url: 'https://mdod.herokuapp.com/api/v1/note',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "id": identifier,
            "email": email,
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            alert("Notitie is verwijderd");
            window.location.href = "notes?email=" + email;
        },
        error: function (data, textStatus, error) {
            console.log(error);
            alert("Er is iets fout gegaan probeer het opnieuw.")
            location.reload();
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

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