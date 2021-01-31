$("#bodymaindiv").hide();
$('#EmployeesBody').on('click', () => {
    $("#bodymaindiv").show();
    var header = ` <table id="employeeTable" width="75%" style="background-color: rgb(0, 0, 0, 0.5)" class="table">
        <thead style='color:white'>
            <th>code</th>
            <th>fname</th>
            <th>lname</th>
            <th>mail</th>
            <th>ads</th>
            <th>age</th>
        </thead>
    </table>`;

    $('#bodymaindiv').empty();
    $('#bodymaindiv').append(header);
    $("#employeeTable").DataTable({
        ajax: {
            url: "json/json.json",
            type: "GET",
            error: function(e) {},
            dataSrc: function(d) {
                return d;
            }
        },
        columns: [{
            data: "randomCode"
        }, {
            data: "fname"
        }, {
            data: "lname"
        }, {
            data: "mail"
        }, {
            data: "ads"
        }, {
            data: "age"
        }]
    });
})
$('#Late_ReportBody').on('click', () => {
    $("#bodymaindiv").show();
    var header = ` <table id="employeeTable" width="75%" style="background-color: rgb(0, 0, 0, 0.5)" class="table">
        <thead style='color:white'>
            <th>code</th>
            <th>name</th>
            <th>late times</th>
        </thead>
    </table>`;

    $('#bodymaindiv').empty();
    $('#bodymaindiv').append(header);
    $("#employeeTable").DataTable({
        ajax: {
            url: "json/json.json",
            type: "GET",
            error: function(e) {},
            dataSrc: function(d) {
                return d;
            }
        },
        columns: [{
            data: "randomCode"
        }, {
            data: "fname"
        }, {
            data: "late"
        }]
    });
})
$('#Excuse_ReportBody').on('click', () => {
    $("#bodymaindiv").show();
    var header = ` <table id="employeeTable" width="75%" style="background-color: rgb(0, 0, 0, 0.5)" class="table">
        <thead style='color:white'>
            <th>code</th>
            <th>name</th>
            <th>Absent time</th>
            <th>The Excuse</th>
        </thead>
    </table>`;

    $('#bodymaindiv').empty();
    $('#bodymaindiv').append(header);
    $("#employeeTable").DataTable({
        ajax: {
            url: "json/json.json",
            type: "GET",
            error: function(e) {},
            dataSrc: function(d) {
                return d;
            }
        },
        columns: [{
            data: "randomCode"
        }, {
            data: "fname"
        }, {
            data: "absent"
        }, {
            data: "Excuse"
        }]
    });
})
var userData = JSON.parse(localStorage.getItem('user'));

let _url = "json/json.json";
let arr = [];
$.ajax({
    url: _url,
    type: "get",
    success: function(data) {

        arr = data;
        $('#bodymaindiv').on('click', '#add', function() {
            let ufname = $(this).parent().parent().children().first().html();

            let obj = userData.find((e) => e.fname == ufname);

            index = userData.findIndex((e) => {
                return e.fname == ufname;
            });

            // console.log(obj);
            arr.push(obj);

            userData.splice(index, 1);
            localStorage.setItem("user", JSON.stringify(userData));
            // console.log(arr);
            SaveData();
        });
    },
    error: function err() {
        console.log("Error Mesage!!");
    }
});
$('#Employee_BriefBody').on('click', () => {
    $("#bodymaindiv").show();
    var header = ` <table id="employeeTable" width="65%" style="background-color: rgb(0, 0, 0, 0.5)" class="table">
        <thead style='color:white'>
            <th>Frist Name</th>
            <th>Last Name</th>
            <th>User Name</th>
            <th>ads</th>
            <th>Age</th>
            <th>E-mail</th>
            <th>New User</th>
        </thead>
    </table>`;
    $('#bodymaindiv').empty();
    $('#bodymaindiv').append(header);
    $("#employeeTable").DataTable({
        data: userData,
        columns: [{
            data: "fname"
        }, {
            data: "lname"
        }, {
            data: "userName"
        }, {
            data: "ads"
        }, {
            data: "age"
        }, {
            data: "mail"
        }, {
            defaultContent: `<button id="add" class="btn btn-success text-white">Add</button>\
                        <button id="reject" class="btn btn-danger text-white">Reject</button>`
        }]


    });
    var table = $('#employeeTable').DataTable();
    $('#bodymaindiv').on('click', 'tr', function() {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    $('#bodymaindiv').on('click', '#reject', function() {
        var del = table.row('.selected');
        let uids = $(this).parent().parent().children().first().html();
        index = userData.findIndex((e) => {
            return e.fname == uids;
        });
        userData.splice(index, 1);
        localStorage.setItem("user", JSON.stringify(userData));
        del.remove().draw(false);
    });


})

function SaveData() {

    var _StoreData = new Blob([JSON.stringify(arr)], {
        type: "appliction/json"
    });
    var Linkelement = document.createElement("a");
    Linkelement.href = window.webkitURL.createObjectURL(_StoreData);
    Linkelement.setAttribute("download", "json/json.json");
    document.body.appendChild(Linkelement);
    Linkelement.click();
    document.body.removeChild(Linkelement);
}