'use strict';

function insertWords() {
    let xht = CreateRequest();
    chrome.storage.local.get('token', function (result) {
        let token = result.token;
        xht.open('POST', 'http://localhost/php/getWords.php', false);
        xht.setRequestHeader('token', token);
        xht.send();
        console.log(xht);
        var words = document.createElement('div');
        words.id = 'list_words';
        words.innerHTML = xht.responseText;
        document.getElementById('main_content').appendChild(words);
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

function logout() {
    let xht = CreateRequest();
    chrome.storage.local.get('token', function (result) {
        let token = result.token;
        xht.open('POST', 'http://localhost/php/logout.php', false);
        xht.setRequestHeader('token', token);
        xht.send();
    });
    chrome.storage.local.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
    window.location = '/popup.html';
}

function updatedContent() {
    chrome.storage.local.get('token', function (result) {
        let xht = CreateRequest();
        let token = result.token;
        xht.open('POST', 'http://localhost/php/allWords.php', false);
        xht.setRequestHeader('token', token);
        xht.send();
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            let gotWords = xht.response;
            chrome.tabs.sendMessage(activeTab.id, gotWords);
        });
    });
}

updatedContent();

insertWords();

exit.addEventListener('click', logout);