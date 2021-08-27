import UIkit from 'uikit';
// @ts-ignore
import Icons from 'uikit/dist/js/uikit-icons';
import ReactDOM from 'react-dom';
import React from 'react';
import Main from './components/main';
import '../css/uikit.min.css';

// @ts-ignore
UIkit.use(Icons);

window.onload = function () {
  chrome.sessions.getDevices(function (results) {
    const main = document.getElementById('main')!;

    ReactDOM.render(<Main Devices={results} />, main);
  });
};
