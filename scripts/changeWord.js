'use strict';


document.body.onchange=function(e){
    let elem = e ? e.target : window.event.srcElement;
    let elemId = elem.parentNode.id;
    var newWord = elem.parentNode.children[0].value;
    var newColor = elem.parentNode.children[1].value;
    chrome.storage.local.get('token', function (result) {
        let xht = CreateRequest();
        var fd = new FormData;
        let token = result.token;
        fd.append('word', newWord);
        fd.append('color', newColor);
        fd.append('id', elemId);
        xht.open('POST', 'http://localhost/php/updateWord.php', false);
        xht.setRequestHeader('token', token);
        xht.send(fd);
        elem.parentNode.children[1].style.backgroundColor = newColor;
    });
};

document.body.onclick=function(e){
    let elem = e ? e.target : window.event.srcElement;
    let elemClass = elem.className;
    if (elemClass == 'remove') {
        chrome.storage.local.get('token', function (result) {
            let xht = CreateRequest();
            var fd = new FormData;
            let token = result.token;
            fd.append('id', elem.parentNode.id);
            xht.open('POST', 'http://localhost/php/removeWord.php', false);
            xht.setRequestHeader('token', token);
            xht.send(fd);
        });
        window.location.reload();
    }
};

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