document.addEventListener('DOMContentLoaded', function () {
    try {

        const filterUrl = localStorage.getItem('url');
        const name = localStorage.getItem('name');
        const token = localStorage.getItem('token');

        function isStandardUrl (url) {
            return url.indexOf('http://') === 0 || url.indexOf('https://') === 0
        }

        function setPopup (tabId, popup) {
            return chrome.browserAction.setPopup({'tabId' : tabId, 'popup' : popup});
        }

        function setPopupDetail (tab) {
            if (isStandardUrl(tab.url)) {
                setPopup(tab.id, './page/popup.html');
            } else {
                setPopup(tab.id, './page/error.html');
            }
        }

        if (filterUrl && filterUrl.match(/^http:\/\/.+/) && name && token) {
            chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
                if (details.requestHeaders) {
                    for (var i = 0, j = details.requestHeaders.length; i < j; i++) {
                        if (details.requestHeaders[i].name && details.requestHeaders[i].name.toLowerCase() === 'cookie') {
                            details.requestHeaders[i].value = [name, token].join('=') + '; ' + details.requestHeaders[i].value;
                            break;
                        }
                    }
                }
                return {requestHeaders : details.requestHeaders};
            }, {urls : [filterUrl]}, ['requestHeaders', 'blocking']);
        } else {
            localStorage.removeItem('url');
        }

        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            switch (changeInfo.status) {
                case 'complete':
                    return setPopupDetail(tab);
                    break;
                case 'loading':
                default :
                    return setPopupDetail(tab);
            }
        });

        chrome.tabs.query({currentWindow : true, active : true}, function (tabs) {
            if (tabs && tabs.length) setPopupDetail(tabs[0])
        });
    } catch (e) {
        location.reload();
    }
});

