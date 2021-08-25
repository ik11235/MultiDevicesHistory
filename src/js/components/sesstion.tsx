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

    return (
        <div className="session uk-card-default">
            <div className="uk-card-header">
                <h4 className="uk-card-title uk-margin-remove-bottom">{"セッション " + props.index}</h4>
                <p className="uk-text-meta uk-margin-remove-top uk-margin-remove-bottom">{tabs.length}個のタブ</p>
                <p className="uk-text-meta uk-margin-remove-top">セッションID: {sessionId}</p>
                <div className="uk-grid">
                    <div className="uk-width-auto"><span
                        className="session_tab_link_open uk-link">このセッションのすべてのリンクを開く</span>
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
