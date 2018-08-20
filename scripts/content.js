'use strict';



chrome.runtime.onMessage.addListener(receiver);
function receiver(words, sender, sendResponse) {
    let JSONwords = JSON.parse(words);
    for (var i = 0; i < JSONwords.length; i++) {
        let color = JSONwords[i]['color'].replace(/\s+/g, '');
        findWords(document.body, JSONwords[i]['word'], color);
    }

    function findWords (node, word, color) {
        if (node.nodeType === document.ELEMENT_NODE) {
            for (var i = 0; i < node.childNodes.length; i++) {
                if (findWords(node.childNodes[i], word, color)) {
                }
            }
        } else if (node.nodeType === document.TEXT_NODE && node.nodeValue.indexOf(word) > -1 && node.parentNode.className != 'findWord') {
            node.parentNode.innerHTML = node.parentNode.innerHTML.replace(word, '<span class="findWord" style=background-color:'+color+'>'+word+'</span>')
        }
    }

    var target = document.body;
    var observer = new MutationObserver(function() {
        for (var i = 0; i < JSONwords.length; i++) {
            let color = JSONwords[i]['color'].replace(/\s+/g, '');
            findWords(document.body, JSONwords[i]['word'], color);
        }
    });

    var config = { childList: true, characterData: true };

    observer.observe(target, config);
}