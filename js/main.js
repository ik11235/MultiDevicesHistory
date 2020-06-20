function getDomein(str) {
    try {
        const parser = new URL(str);
        return parser.hostname;
    } catch (e) {
        if (e instanceof TypeError) {
            return "";
        } else {
            throw e;
        }
    }
}

function escape_html(string) {
    // https://qiita.com/saekis/items/c2b41cd8940923863791
    if (typeof string !== 'string') {
        return string;
    }
    return string.replace(/[&'`"<>]/g, function (match) {
        return {
            '&': '&amp;',
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
        }[match]
    });
}

function openAllTabForSession(e) {
    let now = this;
    while (!now.classList.contains("session")) {
        now = now.parentNode;
    }

    const link_url_list = getAllTabUrl(now);
    allOpenLink(link_url_list);
}


function openAllTabForDevice(e) {
    let now = this;
    while (!now.classList.contains("device")) {
        now = now.parentNode;
    }

    const link_url_list = getAllTabUrl(now);
    allOpenLink(link_url_list);
}

function getAllTabUrl(element) {
    return Array.from(element.getElementsByClassName("tab_link")).map(
        function (link) {
            return link.href;
        });
}

function createTabs(properties) {
    return new Promise((resolve, reject) => {
        chrome.tabs.create(properties, () => {
            const error = chrome.runtime.lastError;
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function allOpenLink(link_list) {
    let promiseArray = [];
    link_list.forEach(function (link) {
        promiseArray.push(createTabs({url: link, active: false}));
    });
    Promise.all(promiseArray).catch(function (reason) {
        alert(reason);
    });
}

window.onload = function () {
    chrome.sessions.getDevices(function (results) {
        const main = document.getElementById('main');
        results.forEach(function (result) {
            const device_name = result.deviceName;
            // https://qiita.com/fukasawah/items/db7f0405564bdc37820e
            const device_uniq_key = `${device_name}_${Math.random().toString(32).substring(2)}`;
            main.insertAdjacentHTML('beforeend', `<div id="${device_uniq_key}" class="device"></div>`);

            const div = document.getElementById(device_uniq_key);

            div.insertAdjacentHTML('beforeend', `<h3>${device_name}</h3>`);
            const click_id = `${device_uniq_key}_click`;
            div.insertAdjacentHTML('beforeend', `<a id="${click_id}">${device_name}のすべてのタブを開く</a>`);
            document.getElementById(click_id).addEventListener("click", openAllTabForDevice);

            const sessions = result.sessions;
            for (let i = 0; i < sessions.length; i++) {
                const session = sessions[i];
                const tabs = session.window.tabs;

                const tabs_html = tabs.map(function (tab) {
                    const url = (tab.pendingUrl ? tab.pendingUrl : tab.url);
                    const domain = getDomein(url);
                    // URLパースに失敗した場合、""を返す
                    // そのままだと、https://www.google.com/s2/faviconsが400になるので、空文字を渡す
                    const encode_domain = (domain === "") ? encodeURI(" ") : encodeURI(domain);
                    const encode_url = escape_html(url);
                    const encode_title = escape_html(tab.title);
                    return `
                        <li>
                            <img src="https://www.google.com/s2/favicons?domain=${encode_domain}" alt="${encode_title}"/>
                            <a href="${encode_url}" class="tab_link" data-url="${encode_url}" data-title="${encode_title}">${encode_title}</a>
                        </li>`;
                }).join("\n");

                const insertHtml = `
                    <div class="session uk-card-default">
                        <div class="uk-card-header">
                            <h4 class="uk-card-title uk-margin-remove-bottom">セッション${i + 1}</h4>
                            <p class="uk-text-meta uk-margin-remove-top uk-margin-remove-bottom">${tabs.length}個のタブ</p>
                            <p class="uk-text-meta uk-margin-remove-top">セッションID: ${session.window.sessionId}</p>
                            <div class="uk-grid">
                                <div class="uk-width-auto"><span class="session_tab_link_open uk-link">このセッションのすべてのリンクを開く</span></div>
                                <div class="uk-width-expand"></div>
                            </div>
                        </div>
                        <div class="uk-card-body">
                            <ul>${tabs_html}</ul>
                        </div>
                    </div>`;
                div.insertAdjacentHTML('beforeend', insertHtml);
                div.getElementsByClassName("session_tab_link_open")[0].addEventListener("click", openAllTabForSession);
            }
        });
    });
}
