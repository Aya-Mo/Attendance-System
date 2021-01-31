var empName = sessionStorage.getItem('userName');
var userAttCode = document.getElementById("userattcode");
$('#MonthlyReportBody').hide();
$('#DailyReportBody').hide();
window.addEventListener('load', function() {

    let _url = "json/json.json";
    let arr = [];
    $.ajax({
        url: _url,
        type: "get",
        success: function(data) {

            arr = data;
            console.log("json file", arr);

        },
        error: function err() {
            console.log("Error Mesage!!");
        }
    });

    $('#Monthly_ReportBody').on('click', () => {
        $('#Welcoming').hide();
        $('#MonthlyReportBody').show();
        $('#DailyReportBody').hide();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].userName == empName) {
                document.getElementById('attendancetime').innerText = arr[i].attend;
                document.getElementById('lateTimes').innerText = arr[i].late;
                document.getElementById('absenceTimes').innerText = arr[i].absent;
            }
        }
    });
    $('#Daily_ReportBody').on('click', () => {
        $('#Welcoming').hide();
        $('#MonthlyReportBody').hide();
        $('#DailyReportBody').show();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].userName == empName) {
                // if (arr[i].Attendtime) {

                // }
                document.getElementById("entTime").innerText = arr[i].Attendtime;

            }
        }
    });

});