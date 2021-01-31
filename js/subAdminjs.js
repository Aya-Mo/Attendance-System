var empName = sessionStorage.getItem('userName');
var userAttCode = document.getElementById("userattcode");
$('#MonthlyReportBody').hide();
$('#DailyReportBody').hide();
$('#setAttendance').hide();
$('#viewAttendance').hide();
window.addEventListener('load', function() {

    $('#Monthly_ReportBody').on('click', () => {
        $('#Welcoming').hide();
        $('#MonthlyReportBody').show();
        $('#DailyReportBody').hide();
        $('#setAttendance').hide();
        $('#viewAttendance').hide();
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
        $('#setAttendance').hide();
        $('#viewAttendance').hide();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].userName == empName) {

                document.getElementById("entTime").innerText = arr[i].Attendtime;

            }
        }
    });
    $('#attendance_systemBody').on('click', () => {
        $('#Welcoming').hide();
        $('#MonthlyReportBody').hide();
        $('#DailyReportBody').hide();
        $('#setAttendance').show();
        $('#viewAttendance').hide();

    });
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
    var d = new Date();
    var today = +new Date().getDate();
    var time = new Date().toLocaleTimeString();

    $('#btncon').on('click', () => {
        var user = getUser();

        if (user) {
            //checkTime();
            var Today = user.Today;
            if (Today != today) {
                user.Today = today;
                user.Attendtime = time;
                var searchEorPM = d.toLocaleTimeString().includes("AM");
                var h = d.getHours();
                var m = d.getMinutes();

                var countlate = +parseInt(user.late);
                var countabsant = +parseInt(user.absent);
                var countattend = +parseInt(user.attend);
                if (h == 09 && searchEorPM) {
                    if (m <= 15) {
                        user.attend = countattend + 1;
                        console.log("attend on time");
                    } else if (m > 15 || m <= 55) {
                        console.log(user.late);
                        user.late = countlate + 1;

                    } else {
                        user.absent = countabsant + 1;
                    }
                } else {
                    user.absent = countabsant + 1;
                }

                SaveData();
                $('#viewAttendance').show();
                document.getElementById('employeeName').innerText = user.fname + " " + user.lname;
                enterTime.innerText = user.Attendtime;


            } else {
                alert("This Attendance toke before!!");
            }

        } else {
            alert("No Code Matched");
        }


    });

    function getUser() {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].randomCode == userAttCode.value) {
                return arr[i];
            }
        }
    }

    function SaveData() {
        console.log(arr);
        var _StoreData = new Blob([JSON.stringify(arr)], { type: "appliction/json" });
        var Linkelement = document.createElement("a");
        Linkelement.href = window.webkitURL.createObjectURL(_StoreData);
        Linkelement.setAttribute("download", "json/json.json");
        document.body.appendChild(Linkelement);
        Linkelement.click();
        document.body.removeChild(Linkelement);
    }


})