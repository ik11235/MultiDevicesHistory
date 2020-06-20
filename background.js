chrome.sessions.getDevices(function (results) {
    results.forEach(function (result) {
        let device_name = result.deviceName;
        console.log(device_name);
        let sessions = result.sessions;
        sessions.forEach(function (session) {
            let tabs = session.window.tabs;
            tabs.forEach(function (tab) {
                const url = (tab.pendingUrl ? tab.pendingUrl : tab.url);
                console.log(tab.title + " " + url + " " + tab.sessionId);
            });
        });
    });
    console.log(results);
});


// Error この方法ではsessionのtabは閉じれない
chrome.tabs.remove("session_sync4076705350322316997-256457446.13259", function (result) {
    console.log(result);
});