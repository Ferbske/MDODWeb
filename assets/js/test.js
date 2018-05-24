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