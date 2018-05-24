// function login() {
//     $.post("https://mdod.herokuapp.com/api/login/psychologist",
//         {
//             "email": "niek@gmail.com",
//             "password": "flippie"
//         },
//         function(data, status){
//             alert("Data: " + data + "\nStatus: " + status);
//         });
// }

// function login() {
//     console.log("TEST 1");
//     $.ajax({
//         type: "POST",
//         url: "https://mdod.herokuapp.com/api/login/psychologist",
//         data: {
//             "email": "niek@gmail.com",
//             "password": "flippie"
//         },
//         success: console.log("Succes!"),
//         error: console.log("Fail"),
//         dataType: "json"
//     });
//     console.log("TEST 2")
// }


$(document).ready(function() {

    $('#form').on('submit', function () {
        //
        // let input = $('form input');
        // let product = {name: input.val()};

        $.ajax({
            type: 'POST',
            url: '/',
            data: {
                "email": "niek@gmail.com",
                "password": "flippie"
            },
            success: function (data) {
                //do something with the data via front-end framework
                // location.reload();
                console.log("shcces")
            }
        });
        console.log("fail");
        return false;

    });
})