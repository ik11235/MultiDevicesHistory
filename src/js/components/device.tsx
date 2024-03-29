import React from 'react';
import Session from './sesstion';
import { util } from '../util';

interface DeviceProps {
  device: chrome.sessions.Device;
}

const Device: React.FC<DeviceProps> = (props) => {
  const deviceName = props.device.deviceName;
  const openAllTabForDevice = () => {
    props.device.sessions.forEach(util.openSessionAllPage);
  };

  return (
    <div className="device">
      <h3>{deviceName}</h3>
      <a onClick={openAllTabForDevice}>
        {chrome.i18n.getMessage('content_msg_device_all_tab_open', [
          deviceName,
        ])}
      </a>
      {props.device.sessions.map((session, index) => {
        return (
          <Session
            Session={session}
            index={index}
            key={session.window?.sessionId!}
          />
        );
      })}
    </div>
  );
};

export default Device;
