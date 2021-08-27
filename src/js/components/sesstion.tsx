import React from 'react';
import { Tab } from './tab';
import { util } from '../util';

interface SessionProps {
  Session: chrome.sessions.Session;
  index: number;
}

const Session: React.FC<SessionProps> = (props) => {
  const window = props.Session.window!;
  const tabs = window.tabs!;
  const sessionId = window.sessionId!;

  const openAllTab = () => {
    util.openSessionAllPage(props.Session);
  };

  return (
    <div className="session uk-card-default">
      <div className="uk-card-header">
        <h4 className="uk-card-title uk-margin-remove-bottom">
          {chrome.i18n.getMessage('content_msg_session') + props.index}
        </h4>
        <p className="uk-text-meta uk-margin-remove-top uk-margin-remove-bottom">
          {chrome.i18n.getMessage('content_msg_tab_length', [tabs.length])}
        </p>
        <p className="uk-text-meta uk-margin-remove-top">
          {chrome.i18n.getMessage('content_msg_session_io') + sessionId}
        </p>
        <div className="uk-grid">
          <div className="uk-width-auto">
            <span
              className="session_tab_link_open uk-link"
              onClick={openAllTab}
            >
              {chrome.i18n.getMessage('content_msg_session_all_tab_open')}
            </span>
          </div>
          <div className="uk-width-expand" />
        </div>
      </div>
      <div className="uk-card-body">
        {tabs.map((nowTab, index) => {
          return (
            <Tab
              key={sessionId + index}
              tab={{ url: nowTab.url!, title: nowTab.title! }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Session;
