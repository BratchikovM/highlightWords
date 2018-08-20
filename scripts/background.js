'use strict';

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

chrome.tabs.onUpdated.addListener(update);

function update(tabId, changeInfo, tab) {
    let xht = CreateRequest();
    chrome.storage.local.get('token', function (result) {
        let token = result.token;
        xht.open('POST', 'http://localhost/php/allWords.php', false);
        xht.setRequestHeader('token', token);
        xht.send();
        console.log(xht.response);
        let gotWords = xht.response;
        chrome.tabs.sendMessage(tab.id, gotWords);
    });
}
