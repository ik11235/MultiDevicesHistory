import React from 'react';
import Session from "./sesstion";
import {util} from "../util";

interface DeviceProps {
    device: chrome.sessions.Device;
}

const Device: React.FC<DeviceProps> = (props) => {

    const device_name = props.device.deviceName
    const openAllTabForDevice = () => {
        props.device.sessions.forEach(util.openSessionAllPage);
    }

    return (
        <div className="device">
            <h3>{device_name}</h3>
            <a onClick={openAllTabForDevice}>{device_name}のすべてのタブを開く</a>
            {props.device.sessions.map((session, index) => {
               return <Session Session={session} index={index} key={session.window?.sessionId!}/>
            })}
        </div>
    );
};

export default Device;