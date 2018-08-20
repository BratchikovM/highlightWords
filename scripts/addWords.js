'use strict';

let wordField = document.getElementById('word');
let colorField = document.getElementById('out_color');

function validateWord() {
    if (wordField.value.replace(/\s/g, '') == '') {
        wordField.style.border = '1px solid #FC0107';
        return false;
    } else {
        wordField.style.border = '1px solid #cccccc';
        return true;
    }
}

function validateColor() {
    if (colorField.style.backgroundColor == '') {
        colorField.style.border = '1px solid #FC0107';
        return false;
    } else {
        colorField.style.border = '1px solid #cccccc';
        return true;
    }
}

function addWordBd() {
    if (validateWord() && validateColor()) {
        let xht = CreateRequest();
        var fd = new FormData;
        chrome.storage.local.get('token', function (result) {
            let token = result.token;
            fd.append("word", wordField.value);
            fd.append("color", colorField.style.backgroundColor);
            xht.open('POST', 'http://localhost/php/insertWord.php', false);
            xht.setRequestHeader('token', token);
            xht.send(fd);
            if (xht.readyState == 4) {
                updatedContent();
                window.location.href = '/words.html';
            }
        });
    }
}

function updatedContent() {
    chrome.storage.local.get('token', function (result) {
        let xht = CreateRequest();
        let token = result.token;
        xht.open('POST', 'http://localhost/php/allWords.php', false);
        xht.setRequestHeader('token', token);
        xht.send();
        console.log(xht.response);
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            let gotWords = xht.response;
            console.log(gotWords);
            chrome.tabs.sendMessage(activeTab.id, gotWords);
        });
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

addNewWord.addEventListener('click', addWordBd);
word.addEventListener('blur', validateWord);