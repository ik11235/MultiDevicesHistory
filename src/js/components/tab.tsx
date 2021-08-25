import { model } from '../types/interface';
import React from 'react';
import { util } from '../util';

interface TabProps {
  tab: model.Tab;
}

export const Tab: React.FC<TabProps> = (props) => {
  const domain = util.getDomain(props.tab.url);
  const encodeDomain = domain === '' ? encodeURI(' ') : encodeURI(domain);
  const encodeUrl = util.escapeHtml(props.tab.url);
  const encodeTitle = util.escapeHtml(props.tab.title);

  return (
    <li className="tab-root-dom">
      <img
        src={`https://www.google.com/s2/favicons?domain=${encodeDomain}`}
        alt={encodeTitle}
      />
      <a
        href={encodeUrl}
        className="tab_link"
        data-url={encodeUrl}
        data-title={encodeTitle}
      >
        {encodeTitle}
      </a>
    </li>
  );
};

export default Tab;
