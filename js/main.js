window.onload = function () {
    chrome.sessions.getDevices(function (results) {
        const main = document.getElementById('main');
        console.log(main);
        results.forEach(function (result) {
            let device_name = result.deviceName;
            console.log(device_name);
            main.insertAdjacentHTML('beforeend', `<h2>${device_name}</h2>`);

            let sessions = result.sessions;
            sessions.forEach(function (session) {
                main.insertAdjacentHTML('beforeend', `<h3>Session Id${session.window.sessionId}</h3>`);
                let tabs = session.window.tabs;
                main.insertAdjacentHTML('beforeend', `<h3>${tabs.length}個のタブ</h3>`);
                tabs.forEach(function (tab) {
                    const url = (tab.pendingUrl ? tab.pendingUrl : tab.url);
                    console.log(tab.title + " " + url + " " + tab.sessionId);
                    main.insertAdjacentHTML('beforeend', `<p><a href="${url}" target="_blank">${tab.title}</p>`);
                });
            });
        });

        console.log(results);
    });
};
