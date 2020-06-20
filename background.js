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
