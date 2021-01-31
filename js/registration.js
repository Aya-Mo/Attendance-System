var user = JSON.parse(localStorage.getItem("user") || "[]");
window.addEventListener('load', function() {

    fname = document.getElementById("fname");
    lname = document.getElementById("lname");
    ads = document.getElementById("ads");
    mail = document.getElementById("mail");
    age = document.getElementById("age");
    userName = document.getElementById("username");
    password = document.getElementById("password");
    signup = document.getElementById("signup");
    msg = document.getElementById("msg");

    spantxt1 = document.getElementById("spantxt1");
    spantxt2 = document.getElementById("spantxt2");
    spanads = document.getElementById("spanads");
    spanmail = document.getElementById("spanmail");
    spanage = document.getElementById("spanage");
    spanpass = document.getElementById("spanpass");

    fname.addEventListener('blur', function() {
        if (!isValidFristName()) {
            fname.focus();
            fname.select();
            spantxt1.style.display = 'block';
            fname.className = 'error';

        } else {
            fname.className = '';
            spantxt1.style.display = 'none';

        }

    }); //end of fname blur

    lname.addEventListener('blur', function() {
        if (!isValidLastName()) {
            lname.focus();
            lname.select();
            spantxt1.style.display = 'block';
            lname.className = 'error';

        } else {
            lname.className = '';
            spantxt1.style.display = 'none';

        }
    }); //end of lname blur
    userName.addEventListener('blur', function() {
        if (!isValidUserName()) {
            userName.focus();
            userName.select();
            spantxt2.style.display = 'block';
            userName.className = 'error';

        } else {
            userName.className = '';
            spantxt2.style.display = 'none';

        }

    });
    password.addEventListener('blur', function() {
        if (!isValidPass()) {
            password.focus();
            password.select();
            spanpass.style.display = 'block';
            password.className = 'error';

        } else {
            password.className = '';
            spanpass.style.display = 'none';

        }

    });
    ads.addEventListener('blur', function() {
        if (!isValidAddress()) {
            ads.focus();
            ads.select();
            spanads.style.display = 'block';
            ads.className = 'error';

        } else {
            ads.className = '';
            spanads.style.display = 'none';

        }

    }); // end of blur for address


    mail.addEventListener('blur', function() {
        if (!isValidUserEmail()) {
            mail.focus();
            mail.select();
            spanmail.style.display = 'block';
            mail.className = 'error';

        } else {
            mail.className = '';
            spanmail.style.display = 'none';

        }

    }); // end of blur for user email
    age.addEventListener('blur', function() {
        if (!isValidAge()) {
            age.focus();
            age.select();
            spanage.style.display = 'block';
            age.className = 'error';

        } else {
            age.className = '';
            spanage.style.display = 'none';

        }

    });


    document.forms[0].addEventListener('submit', function(e) {
        //   e.preventDefault();

        if (!isValidFristName()) {
            fname.focus();
            spantxt1.style.display = 'block';
        }

        if (!isValidLastName()) {
            lname.focus();
        }
        if (!isValidAddress()) {
            ads.focus();
        }
        if (!isValidUserEmail()) {
            mail.focus();
        }
        if (!isValidAge()) {
            age.focus();
        }
        if (!isValidUserName()) {
            userName.focus();
        }
        if (!isValidPass()) {
            password.focus();
        }
        if ((isValidFristName() && isValidUserName() && isValidAddress() && isValidUserEmail() && isValidLastName() && isValidAge())) {
            addEmployee();
            alert("your data saved correctly,wait till the admin accept you. ");
        }
    })

    //reset
    document.forms[0].addEventListener('reset', function(e) {
        if (!confirm("Are Your Sure !!?")) {
            e.preventDefault();

        } else {
            fname.focus();
        }

    });



}); //end of load 
function addEmployee() {

    //if (isValidFristName() && isValidUserName() && isValidAddress() && isValidUserEmail() && isValidLastName() && isValidAge()) {

    user.push({

        "fname": fname.value,
        "lname": lname.value,
        "userName": userName.value,
        "password": password.value,
        "ads": ads.value,
        "mail": mail.value,
        "age": age.value,
        "randomCode": creatRand(),
        "Attendtime": 0,
        "Today": 0,
        "absent": 0,
        "attend": 0,
        "late": 0,
        "Excuse": "no excuse"
    })
    localStorage.setItem('user', JSON.stringify(user));



    //  }

    function creatRand() {
        var x = Math.floor(Math.random() * 100001);
        if (checkuserCode(x)) {
            return x;
        } else {
            return creatRand();
        }
    }

    //fuctionCheckRandumNumber
    function checkuserCode(x) {
        for (var i = 0; i < user.length; i++) {

            if (user[i].randomCode == x) {
                return false;
            }
        }
        return true;

    }


}

function isValidFristName() {
    return fname.value.match(/^[A-Za-z]{3,15}$/);

}

function isValidLastName() {
    return lname.value.match(/^[A-Za-z]{3,15}$/);

}

function isValidUserEmail() {
    return mail.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/);

}

function isValidAddress() {
    return ads.value.match(/^[A-Za-z]{2,30}$/);
}

function isValidAge() {
    return age.value.match(/^2[0-9]|3[0-9]|4[0-9]|5[00]$/);
}

function isValidUserName() {
    return userName.value.match(/^[A-Za-z0-9]{3,30}$/);

}

function isValidPass() {
    return password.value.match(/^[A-Za-z0-9]{8}/g);
}