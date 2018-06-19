// This function adds the header and footer to the page if you add
// <header id="header"></header> at the start of the <body>
// and
// <footer id="footer"></footer> at the end of the </body>

function include() {
    $("#header").load("../views/header");
    $("#footer").load("../views/footer");
};

include();