let token = getCookie("AuthToken");

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://mdod.herokuapp.com/api/v1/all/client',
        dataType: 'JSON',
        beforeSend: setHeader,

        success: function (data, textStatus, xhr) {
            console.log("Succes");
            let x = 0, txt = "";
            txt += "<table border='1'>";
            for (x in data) {
                txt += "<tr id='tablerow" + x + "'>" +
                "<td><a href='client/" + data[x].email + "'>" + data[x].email + "</a></td>" +
                "<td>" + data[x].firstname + "</td>" +
                "<td>" + data[x].infix + "</td>" +
                "<td>" + data[x].lastname + "</td>" +
                "</tr>";
                x++;
            }
            txt += "</table>";
            document.getElementById("tableClients").innerHTML = txt;
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    });
});

// $(document).ready(function() {
//     let obj, dbParam, xmlhttp, myObj, x, txt = "";
//     obj = { "table":"customers", "limit":20 };
//     dbParam = JSON.stringify(obj);
//     xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             myObj = JSON.parse(this.responseText);
//             txt += "<table border='1'>";
//             for (x in myObj) {
//                 txt += "<tr><td>" + myObj[x].name + "</td></tr>";
//             }
//             txt += "</table>";
//             document.getElementById("tableClients").innerHTML = txt;
//         }
//     };
//     xmlhttp.open("GET", "json_demo_db_post.php", true);
//     setHeader();
//     xmlhttp.send("x=" + dbParam);
// });

function setHeader(xhr) {
    // Set Authorization header
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    // Set X-Access-Token header
    xhr.setRequestHeader('X-Access-Token', token);
}