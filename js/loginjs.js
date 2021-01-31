window.addEventListener('load', function() {

    userName = document.getElementById("username");
    pass = document.getElementById("password");

    spantxt = document.getElementById("spantxt");
    spanpass = document.getElementById("spanpass");
    spanNoLogin = document.getElementById("spanNoLog");
    userName.addEventListener('blur', function() {
        if (!isValidFristName()) {
            userName.focus();
            userName.select();
            spantxt.style.display = 'block';
            userName.className = 'error';
        } else {
            userName.className = '';
            spantxt.style.display = 'none';
        }

    }); //end of name blur

    pass.addEventListener('blur', function() {
        if (!isValidPass()) {
            pass.focus();
            pass.select();
            spanpass.style.display = 'block';
            pass.className = 'error';
        } else {
            pass.className = '';
            spanpass.style.display = 'none';
        }
    });
    document.getElementById('submit').addEventListener('click', function(e) {
        e.preventDefault();
        if (checkUserExist()) {
            sessionStorage.setItem('userName', userName.value);

            if (userName.value == "EsraaSami") {

                window.open("subadminProfile.html", "_self");
            } else if (userName.value == "AyaMhmd") {
                window.open("adminProfile.html", "_self");
            } else {
                window.open("empProfile.html", "_self");
            }
        } else {
            spanNoLogin.style.display = 'block';

        }
    });

    let _url = "json/json.json";
    let arr = [];
    $.ajax({
        url: _url,
        type: "get",
        success: function(data) {

            arr = data;

        },
        error: function err() {
            console.log("Error Mesage!!");
        }
    });
    //sheckUserExit function//
    function checkUserExist() {


        for (i = 0; i < arr.length; i++) {
            if (arr[i].userName == userName.value && arr[i].password == password.value) {
                return true;
            }
        }
    }
    document.forms[0].addEventListener('reset', function(e) {
        if (!confirm("Are Your Sure !!?")) {
            e.preventDefault();

        } else {
            fname.focus();
        }

    });



}); //end of load

function isValidFristName() {
    return userName.value.match(/^[A-Za-z0-9]{3,15}$/);

}

function isValidPass() {
    return pass.value.match(/^[A-Za-z0-9]{8}/g);
}