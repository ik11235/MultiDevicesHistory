import React from 'react';
import Device from './device';

interface MainProps {
    Devices: chrome.sessions.Device[];
}

const Main: React.FC<MainProps> = (props) => {
    return (
        <div>
            {props.Devices.map((device, index) => {
                return (
                    <Device
                        key={device.deviceName + index}
                        device={device}
                    />
                );
            })}
        </div>
    );
};

export default Main;
