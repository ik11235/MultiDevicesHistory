import React from 'react';
import {Tab} from './tab';

interface SessionProps {
    Session: chrome.sessions.Session;
    index: number
}

const Session: React.FC<SessionProps> = (props) => {
    const window = props.Session.window!;
    const tabs = window.tabs!;
    const sessionId = window.sessionId!;

    const openAllTab = () => {
        chrome.windows.create((window) => {
            for (let i = 0; i < tabs.length; i++) {
                const tab = tabs[i]!;
                if (i == 0) {
                    const nowTabs = window!.tabs!
                    console.log(nowTabs);
                    console.log("now");
                    if (nowTabs.length > 0) {
                        // @ts-ignore
                        const tabId = nowTabs[0].id!;
                        const properties = {url: tab.url, active: false}
                        chrome.tabs.update(tabId, properties);
                    }
                } else {
                    const properties = {windowId: window!.id, url: tab.url, active: false}
                    chrome.tabs.create(properties);
                }
            }
        });
    };

    return (
        <div className="session uk-card-default">
            <div className="uk-card-header">
                <h4 className="uk-card-title uk-margin-remove-bottom">{"セッション " + props.index}</h4>
                <p className="uk-text-meta uk-margin-remove-top uk-margin-remove-bottom">{tabs.length}個のタブ</p>
                <p className="uk-text-meta uk-margin-remove-top">セッションID: {sessionId}</p>
                <div className="uk-grid">
                    <div className="uk-width-auto"><span
                        className="session_tab_link_open uk-link"
                        onClick={openAllTab}>このセッションのすべてのリンクを開く</span>
                    </div>
                    <div className="uk-width-expand"/>
                </div>
            </div>
            <div className="uk-card-body">
                {tabs.map((nowTab, index) => {
                    return (
                        <Tab
                            key={sessionId + index}
                            tab={{url: nowTab.url!, title: nowTab.title!}
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Session;
