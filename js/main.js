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

window.onload = function () {
    chrome.sessions.getDevices(function (results) {
        const main = document.getElementById('main');
        results.forEach(function (result) {
            const device_name = result.deviceName;
            main.insertAdjacentHTML('beforeend', `<h3>${device_name}</h3>`);

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
                        </div>
                        <div class="uk-card-body">
                            <ul>${tabs_html}</ul>
                        </div>
                    </div>`;
                main.insertAdjacentHTML('beforeend', insertHtml);
            }
        });
    });
}
