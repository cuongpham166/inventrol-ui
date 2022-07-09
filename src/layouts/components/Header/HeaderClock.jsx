import React, { useState, useEffect } from 'react';

import { Typography, Row } from 'antd';
const { Title, Text } = Typography;

const HeaderClock = (props) => {
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const refreshClock = () => {
        setTime(new Date());
    };

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);
    return (
        <span style={{ textAlign: 'center' }}>
            <Title level={4} strong style={{ marginBottom: '0px' }}>
                {time.toLocaleTimeString()}
            </Title>
            <Title level={5} style={{ marginTop: '0px', fontWeight: '300' }}>
                {date.toLocaleDateString()}
            </Title>
        </span>
    );
};

export default HeaderClock;
