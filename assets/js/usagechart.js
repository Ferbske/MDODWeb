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
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            let dataCountSubstances = 0;
            let dataCountOneDay = [];
            let dataTotalSubstances = [];
            let dataTotalOneDay = [];

            if(dd<10) {
                dd = '0'+dd
            }

            if(mm<10) {
                mm = '0'+mm
            }

            today = mm + '-' + dd + '-' + yyyy;

            let start = data[0].usedAt.substring(0,10);
            let startDate = new Date(start);
            let endDate = new Date(today);
            let label = [];
            let date = startDate;

            while (date <= endDate) {
                let temp = changeDateformat(date);
                label.push(temp);
                date.setDate(date.getDate() + 1);
            }

            let endLabel = changeDateformat(endDate);
            label.push(endLabel);

            let x = 0, i = 0;
            for (let i in label) {
                for (x in data) {
                    // All needed variables for date
                    let date = data[x].usedAt.substring(0,10);
                    let adate = new Date(date);
                    let currentdate = changeDateformat(adate);

                    if (label[i] == currentdate) {
                        dataCountOneDay.push("1");
                        dataCountSubstances += data[x].amount;
                    }
                    x++;
                }
                dataTotalOneDay.push(dataCountOneDay.length);
                dataTotalSubstances.push(dataCountSubstances);
                dataCountOneDay = [];
                dataCountSubstances = 0;
                i++;
            }

            dataTotalSubstances.push(dataCountSubstances);
            dataTotalOneDay.push(dataCountOneDay.length);

            new Chart(document.getElementById("usage-chart"), {
                type: 'bar',
                data: {
                    labels: label,
                    datasets: [{
                        label: "Hoevaak heeft de cliënt gebruikt",
                        type: "line",
                        borderColor: "#ea8516",
                        data: dataTotalOneDay,
                        fill: false
                    }, {
                        label: "Totale hoeveelheid middelen",
                        type: "bar",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        backgroundColorHover: "#3e95cd",
                        data: dataTotalSubstances,
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Gebruik van de cliënt'
                    },
                    legend: {
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        },
        error: function (data, textStatus, error) {
            console.log(error);
        },
        complete: function (xhr, textStatus) {
            console.log("Status: " + xhr.status);
        }
    })
}

function changeDateformat(date){
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
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
