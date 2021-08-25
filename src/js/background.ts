chrome.browserAction.onClicked.addListener(function () {
    const url = chrome.runtime.getURL('main.html');
    chrome.tabs.create({
        selected: true,
        url: url
    });
});
