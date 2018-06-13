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

            let start = data[0].usedAt.substring(0,10);
            let startDate = new Date(start);
            let endDate = new Date(today);
            let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
            let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            // let day1 = changeDateformat(startDate);
            // let day2 = changeDateformat(endDate);

            let label = [];
            let date = startDate;

            while (date <= endDate) {
                let temp = changeDateformat(date);
                label.push(temp);
                date.setDate(date.getDate() + 1);
            }

            let endLabel = changeDateformat(endDate);
            label.push(endLabel);

            let dataCountSubstances = [];
            let dataTotalOneDay = [];

            new Chart(document.getElementById("usage-chart"), {
                type: 'bar',
                data: {
                    labels: label,
                    datasets: [{
                        label: "Verschillende middelen",
                        type: "line",
                        borderColor: "#ea8516",
                        data: dataCountSubstances,
                        fill: false
                    }, {
                        label: "Totaal die dag gebruikt",
                        type: "bar",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        backgroundColorHover: "#3e95cd",
                        data: dataTotalOneDay
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

function changeDateformat(date){
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay() + 10;

    if (month.length = 1) {
        month = "0" + month;
    }

    return year + "-" + month + "-" + day
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
