'use strict';


function check() {
    chrome.storage.local.get('token', function (result) {
        let token = result.token;
        console.log(token);
        if (token != '') {
            let xht = CreateRequest();
            xht.open('POST', 'http://localhost/php/check.php', false);
            xht.setRequestHeader('token', token);
            xht.send();
            console.log(xht);
            if (xht.responseText == 1) {
                window.location = '/words.html';
                return;
            }
        }
    });
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

check();