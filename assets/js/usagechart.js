let token = getCookie("AuthToken");

function usagechartclient() {
    let email = getParameterByName("email");
    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/usage/client/data',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            data.reverse();

            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1; //January is 0!
            let yyyy = today.getFullYear();

            if(dd<10) {
                dd = '0'+dd
            }

            if(mm<10) {
                mm = '0'+mm
            }

            today = mm + '/' + dd + '/' + yyyy;

            let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            let start = data[0].usedAt.substring(0,10);
            let end = today;
            let firstDate = new Date(start);
            let secondDate = new Date(end);
            let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

            //date format veranderen testen
            console.log("startdate is " + start);
            console.log("enddate is " + end);

            //Format van de date veranderen
            Date.format(end, 'yy-mm-dd');

            console.log("startdate is " + start);
            console.log("enddate is " + end);
            //

            Date.prototype.addDays = function(diffDays) {
                let dat = new Date(this.valueOf());
                dat.setDate(dat.getDate() + diffDays);
                return dat;
            };

            function getDates(startDate, stopDate) {
                let dateArray = [];
                let currentDate = startDate;
                while (currentDate <= stopDate) {
                    dateArray.push(currentDate);
                    currentDate = currentDate.addDays(1);
                }
                return dateArray;
            }

            let dateArray = getDates(new Date(start), (new Date(start)).addDays(diffDays));

            for (let x in dateArray) {
                console.log(x.usedAt);
            }


            // let date = new Date(data[0].usedAt);
            // let startDate = moment(date);
            //
            // console.log(startDate);



            new Chart(document.getElementById("usage-chart"), {
                type: 'bar',
                data: {
                    //Begindatum tot einddatum?
                    //data[0].usedAt tm vandaag
                    labels: [],
                    datasets: [{
                        label: "Frequentie",
                        type: "line",
                        borderColor: "#ea8516",
                        data: [408,547,675,734],
                        fill: false
                    }, {
                        label: "Totaal",
                        type: "bar",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        backgroundColorHover: "#3e95cd",
                        data: [133,221,783,2478]
                    }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Gebruik van de cliënt'
                    },
                    legend: {
                        display: true
                    }
                }
            });
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    })
}

function getDates(startDate, stopDate) {
    let email = getParameterByName("email");
    $.ajax({
        type: 'POST',
        url: 'https://mdod.herokuapp.com/api/v1/usage/client/data',
        dataType: 'JSON',
        beforeSend: setHeader,
        data: {
            "email": email
        },

        success: function (data, testStatus, xhr) {
            var dateArray = [];
            var currentDate = moment(startDate);
            var stopDate = moment(stopDate);
            while (currentDate <= stopDate) {
                dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
                currentDate = moment(currentDate).add(1, 'days');
            }
            return dateArray;
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log(xhr.status);
        }
    });
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

usagechartclient();
