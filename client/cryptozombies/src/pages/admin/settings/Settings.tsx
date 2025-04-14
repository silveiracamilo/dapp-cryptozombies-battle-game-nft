import { Row } from 'antd';
import React from 'react';
import SettingsTabs from './components/SettingsTabs';

const Settings: React.FC = () => {
    return (
        <Row>
            <Row style={{ width: '100%' }}>
                <h1 style={{ color: '#b6a764' }}>Settings</h1>
            </Row>
            <Row style={{ width: '100%' }}>
                <SettingsTabs />
            </Row>
        </Row>
    )
}

export default Settings;