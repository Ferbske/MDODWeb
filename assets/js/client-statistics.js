let email = getParameterByName("email");

function getAllUsages() {
    let html = "<tr>" +
        "<th>Middel</th>" +
        "<th>Gebruikt op</th>" +
        "</tr>";

    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/usage/client/data',
        beforeSend: setHeader,
        dataType: 'JSON',
        data: {
            'email': email
        },

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            for (let x in data) {
                getAverageUsagePerDay(data[x].name, data[x].usedAt.substring(0, 10));
            }
            //
            // for (let x in data) {
            //     html +=
            //         "<tr id='" + data[x].id + "'>" +
            //         "<td id='usage_name'>" + data[x].name + "</td>" +
            //         "<td id='usage_usedAt'>" + data[x].usedAt.substring(0,10)  + "</td>" +
            //         "</tr>";
            // }
            // document.getElementById("tclients_body").innerHTML = html;
        },
        error: function (data, textStatus, xhr) {
            console.log("error on getting substances")
        }
    })
}

function getAverageUsagePerDay(substance, date) {
    let totalUsagePerDay = [];
    let averageUsagePerDay = 0;

    console.log("Average usage per day: " + averageUsagePerDay);
    return averageUsagePerDay;
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
getAllUsages();