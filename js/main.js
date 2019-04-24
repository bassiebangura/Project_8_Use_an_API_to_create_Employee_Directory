/****************************************************************
          SETTING BORDER AND COLOR FOR ACTIVE NAV ITEM
****************************************************************/

const removeActiveClass = (classList)  => {
    //function removes active class li item and svg <path> element
    classList.each(function (i) {
        if ( $(this).hasClass("active")) {
            $(this).removeClass("active")
            $(this).children().children().children().children().children().removeClass("active")
        }  
    });
}

$("#nav-item-dashboard").click(function(event) {
    let classListOfElements = $(".main-nav__icon");
    removeActiveClass(classListOfElements);
    $("#nav-item-dashboard").addClass("active"); //add active class to li item
    $("#nav-item-dashboard").children().children().children().children().children().addClass("active");//add acitve class to svg path element
    
});

$("#nav-item-new-members").click(function(event) {
    let classListOfElements = $(".main-nav__icon");
    removeActiveClass(classListOfElements);
    $("#nav-item-new-members").addClass("active");//add active class to li item
    $("#nav-item-new-members").children().children().children().children().children().addClass("active");//add active class to svg path element
    
});

$("#nav-item-daily-traffic").click(function(event) {
    let classListOfElements = $(".main-nav__icon");
    removeActiveClass(classListOfElements);
    $("#nav-item-daily-traffic").addClass("active");//add active class to li item
    $("#nav-item-daily-traffic").children().children().children().children().children().addClass("active");//add active class to svg path element
    
});

$("#nav-item-settings").click(function(event) {
    let classListOfElements = $(".main-nav__icon");
    removeActiveClass(classListOfElements);
    $("#nav-item-settings").addClass("active");//add active class to li item
    $("#nav-item-settings").children().children().children().children().children().addClass("active");//add active class to svg path element
    
});

/**************************************************************
                    WEB TRAFFIC  CHART                         
****************************************************************/ 
/**********     WEB TRAFFIC HOURLY LABELS AND DATA     ********/
let webTrafficHourlyLabels = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00'];
let webTrafficHourlyData = ['1', '8', '10', '10', '9', '7', '5', '6', '8', '3'];


/**********     WEB TRAFFIC DAILY LABELS AND DATA     ********/
let webTrafficDailyLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let webTrafficDailyData = ['4', '8', '10', '6', '9', '7', '5'];

/**********     WEB TRAFFIC WEEKLY LABELS AND DATA     ********/
let webTrafficWeeklyLabels = ['9-15', '16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17'];
let webTrafficWeeklyData = ['1', '8', '10', '10', '9', '7', '5', '6', '8', '3'];

/**********     WEB TRAFFIC MONTHLY LABELS AND DATA     ********/
let webTrafficMonthlyLabels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Nov', 'Dec'];
let webTrafficMonthlyData = ['1', '8', '10', '10', '9', '7', '5', '6', '8', '3', '6', '13', '6'];


const webTrafficChartCanvas = document.getElementById("web-traffic-chart__figure").getContext('2d');
let webTrafficChartConfig = {
    type: 'line',
    data: {
        labels: webTrafficHourlyLabels,
        datasets: [{
            label: "Traffic",
            data: webTrafficHourlyData
        }]
    },
    options: {
        elements: {
            line: {
                tension: 0 // disables bezier curves
            }
        }
    }
};
const webTrafficChart = new Chart(webTrafficChartCanvas, webTrafficChartConfig);

/************************************************************************************************
 Handling Click That Changes Dataset For Web Traffic Chart And background color for selected item.
         
**************************************************************************************************/

/** function handles changes to background of selected web traffic time units **/
const changeBackgroundColorOfSelectedTrafficTimeUnit = (classList)  => {
    
    classList.each(function (i) {
        if ( $(this).hasClass("traffic-type-selected")) {
            $(this).removeClass("traffic-type-selected")
        } 
        $target = $(event.target);   
        $target.addClass('traffic-type-selected');
    });
}

/******** Set Hourly Web Traffic  *********/
$("#hourly").click(function(event) {
    let data = webTrafficChart.config.data;
    data.labels = webTrafficHourlyLabels
    data.datasets[0].data = webTrafficHourlyData
    webTrafficChart.update();
    let classListOfElements = $(".web-traffic-chart__type");

    changeBackgroundColorOfSelectedTrafficTimeUnit(classListOfElements);
});

/******** Set Daily Web Traffic  *********/
$("#daily").click(function() {
    let data = webTrafficChart.config.data;
    data.labels = webTrafficDailyLabels
    data.datasets[0].data = webTrafficDailyData
    webTrafficChart.update();
    let classListOfElements = $(".web-traffic-chart__type");

    changeBackgroundColorOfSelectedTrafficTimeUnit(classListOfElements);
});

/******** Set Weekly Web Traffic  *********/
$("#weekly").click(function() {
    let data = webTrafficChart.config.data;
    data.labels = webTrafficWeeklyLabels
    data.datasets[0].data = webTrafficWeeklyData
    webTrafficChart.update();
    let classListOfElements = $(".web-traffic-chart__type");

    changeBackgroundColorOfSelectedTrafficTimeUnit(classListOfElements);
});

/******** Set Monthly Web Traffic  *********/
$("#monthly").click(function() {
    let data = webTrafficChart.config.data;
    data.labels = webTrafficMonthlyLabels
    data.datasets[0].data = webTrafficMonthlyData
    webTrafficChart.update();
    let classListOfElements = $(".web-traffic-chart__type");

    changeBackgroundColorOfSelectedTrafficTimeUnit(classListOfElements);
});


/**************************************************************
                     MOBILE USESERS CHART
***************************************************************/
let usersDeviceTypeLabels = ["Phone", "Tablets", "Desktop"]
let usersDeviceTypeData =[5, 10, 25]
let mobileUsersChartBackgroundColor =  ['rgb(0, 91, 150)', 'rgba(0, 255, 0)', 'rgba(0, 0, 255)']
let mobileUsersChartCanvas = document.getElementById("mobile-users-chart__figure").getContext('2d');
let mobileUsersChartConfig = {
    type: 'doughnut',
    data: {
        labels: usersDeviceTypeLabels,
        datasets: [{
            data: usersDeviceTypeData,
            backgroundColor: mobileUsersChartBackgroundColor
        }]
    },
    options: {
        legend: {
            position: 'right'
        }
    }
}
/*** Create new instance of chart using mobileUsersCanvas and mobileUsersChartConfig object  ***/
let mobileUsersChart = new Chart(mobileUsersChartCanvas, mobileUsersChartConfig);

/**************************************************************
                     DAILY TAFFIC CHART
***************************************************************/
let dayOfWeek = ["S", "M", "T", "W", "T", "F", "S"]
let dailyData =[50, 100, 75, 80, 60, 40, 90]
let dailyTrafficChartBackgroundColor =  ['rgb(0, 91, 150)', 
                                        'rgb(0, 91, 150)', 
                                        'rgb(0, 91, 150)', 
                                        'rgb(0, 91, 150)', 
                                        'rgb(0, 91, 150)', 
                                        'rgb(0, 91, 150)',
                                        'rgb(0, 91, 150)']
let dailyTrafficChartCanvas = document.getElementById("daily-traffic-chart__figure").getContext('2d');
/**** Options settings for dailyTrafficChartOption ****/
let dailyTrafficChartOptionsSettings = {
    legend: {
        display: false
    },
    scales: {
        yAxes: [{
            ticks: {
                max: 100,
                min: 0,
                stepSize: 20
            }
        }],
        xAxes: [{
            barPercentage: 0.6
        }]
    }
}
let dailyTrafficChartConfig = {
    type: 'bar',
    data: {
        labels: dayOfWeek,
        datasets: [{
            data: dailyData,
            backgroundColor: dailyTrafficChartBackgroundColor
        }]
    },
    options: dailyTrafficChartOptionsSettings
}
/*** Create new instance of chart using dailyTrafficChartCanvas and dailyTrafficChartConfig object  ***/
let dailyTrafficChart = new Chart(dailyTrafficChartCanvas, dailyTrafficChartConfig);

/**** The Close Button Functionality ****/
$(".close").click(function() {
    $("p").remove(".alert-message");
})

/*****************************************************************
            SEND MESSAGE TO SELECTED USER
 *****************************************************************/
$(".message-user__send-button").click(function() {
    if ($(".message-user__details__search").val() == '' || $(".message-user__details__textarea").val() == '') {
        alert("Error! One or More required field is empty.")
    }
    $(".message-user__details__search").val('').blur();
    $(".message-user__details__textarea").val('').blur(); 

})