'use strict';

let nameField = document.getElementById('login');
let passwordField = document.getElementById('password');


function validateLogin() {
    if (nameField.value.replace(/\s/g, '') == '') {
        nameField.style.border = '1px solid #FC0107';
        return false;
    } else {
        nameField.style.border = '1px solid #cccccc';
        return true;
    }
}

function validatePassword() {
    if (passwordField.value.replace(/\s/g, '') == '') {
        passwordField.style.border = '1px solid #FC0107';
        return false;
    } else if (passwordField.value.replace(/\s/g, '') != '') {
        passwordField.style.border = '1px solid #cccccc';
        return true;
    }
}

function auth() {
    if (validateLogin() && validatePassword()) {
        var fd = new FormData;
        var xht = CreateRequest();
        fd.append("login", nameField.value);
        fd.append("password", passwordField.value);
        xht.open('POST', 'http://localhost/php/signIn.php', false);
        xht.send(fd);
        console.log(xht);
        if (xht.responseText == 1) {
            passwordField.style.border = '1px solid #FC0107';
        } else if (xht.responseText == 0) {
            nameField.style.border = '1px solid #FC0107';
            passwordField.style.border = '1px solid #FC0107';
        } else {
            chrome.storage.local.set({token: xht.responseText});
            window.location.href = "/words.html";
        }
    }
}

function CreateRequest() {
    var Request = false;

    if (window.XMLHttpRequest) {
        //Gecko-совместимые браузеры, Safari, Konqueror
        Request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //Internet explorer
        try {
            Request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (CatchException) {
            Request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }

    if (!Request) {
        alert("Невозможно создать XMLHttpRequest");
    }

    return Request;
}


signIn.addEventListener('click', auth);
login.addEventListener('blur', validateLogin);
password.addEventListener('blur', validatePassword);
window.document.addEventListener('keypress', function(e) {if(e.keyCode === 13) auth();});