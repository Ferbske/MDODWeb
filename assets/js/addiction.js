// API Call functions
//==========================================================
function addictionclient() {
    let email = getParameterByName("email");
    $.ajax({
        type: 'PUT',
        url: 'https://mdod.herokuapp.com/api/v1/addiction',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log("Succes");
            let x = 0, txt = "";
            for (x in data) {
                txt += "<tr id='tablerow" + x + "'>" +
                    "<td>" + data[x].substance + "</td>" +
                    "</tr>";
                x++;
            }
            document.getElementsByClassName("tbody")[0].innerHTML = txt;
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

// // Get all addictions from a specific client. builds a table of all addictions on a succesful api-call
// function getAddictionFromClient() {
//     let email = getParameterByName("email");
//     let addictionList = [];
//     console.log("Supplied email: " + email);
//
//     $.ajax({
//         type: 'POST',
//         url: 'https://mdod.herokuapp.com/api/v1/addiction/single_client',
//         beforeSend: setHeader,
//         dataType: 'JSON',
//         data: {
//             "email": email
//         },
//
//         success: function (data, testStatus, xhr) {
//             console.log("Succes");
//             // return data[0].name;
//             // let txt = "";
//             for (let x in data) {
//                 addictionList.push(data[x].name);
//             }
//             // console.log(addictionList);
//             return addictionList;
//
//             //     txt += "<tr id='tablerow" + x + "'>" +
//             //         "<td>" + data[x].name + "</td>" +
//             //         "</tr>";
//             // }
//             // document.getElementsByClassName("tbody")[0].innerHTML = txt;
//         },
//         error: function (data, textStatus, error) {
//             console.log(error);
//         },
//         complete: function (xhr, textStatus) {
//             console.log(xhr.status);
//         }
//     })
// }

function addAddictionToClient() {
    let email = getParameterByName("email");
    console.log("Supplied email: " + email);

    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/addiction/single_client',
        beforeSend: setHeader,
        dataType: 'JSON',
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            console.log(data[0]);
            console.log("Succes");
        },
        error: function (data, textStatus, error) {
            console.log(error);
            console.log("ERRORRRRR")
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
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