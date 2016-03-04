document.addEventListener('DOMContentLoaded', function () {

    var doc = document;

    function owlBox () {
        var owlHands = doc.querySelectorAll('.owl .hand');
        var owlArms = doc.querySelectorAll('.owl .arms');
        var activeClass = 'hands-up';

        var bindAll = function (elems, callback) {return Array.prototype.slice.call(elems).forEach(callback);};

        var tokenBox = doc.querySelector('#token');
        tokenBox.addEventListener('focus', function () {
            bindAll(owlHands, function (elem) {
                elem.classList.add(activeClass);
            });
            bindAll(owlArms, function (elem) {
                elem.classList.add(activeClass);
            });
        });
        tokenBox.addEventListener('focusout', function () {
            bindAll(owlHands, function (elem) {
                elem.classList.remove(activeClass);
            });
            bindAll(owlArms, function (elem) {
                elem.classList.remove(activeClass);
            });
        });
    }

    function buttons () {
        var saveBtn = doc.querySelector('#btn-save');
        var resetBtn = doc.querySelector('#btn-reset');

        var name = doc.querySelector('#name');
        var token = doc.querySelector('#token');
        var url = doc.querySelector('#url');

        saveBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (name.value && token.value && url.value) {
                localStorage.setItem('name', name.value);
                localStorage.setItem('token', token.value);
                localStorage.setItem('url', url.value);
                chrome.runtime.reload();
            }
        });
        resetBtn.addEventListener('click', function (e) {
            e.preventDefault();
            name.value = '';
            token.value = '';
            localStorage.removeItem('name');
            localStorage.removeItem('token');
            localStorage.removeItem('url');
            chrome.runtime.reload();
        });
    }

    function inputs () {
        var name = doc.querySelector('#name');
        var token = doc.querySelector('#token');
        var url = doc.querySelector('#url');

        var nameSaved = localStorage.getItem('name');
        var tokenSaved = localStorage.getItem('token');
        var urlSaved = localStorage.getItem('url');
        if (nameSaved && tokenSaved && urlSaved) {
            name.value = nameSaved;
            token.value = tokenSaved;
            url.value  = urlSaved;
        }
    }

    owlBox();
    buttons();
    inputs();

});
