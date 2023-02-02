import React from 'react';
import { Tabs, Col, Row, Button, Card } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';
import { SearchSetting, AccountSetting } from 'components/Settings';

const SettingList = (props) => {
    const items = [
        {
            key: '1',
            label: `Search Settings`,
            children: <SearchSetting />,
        },
        {
            key: '2',
            label: `Account Settings`,
            children: <AccountSetting />,
        },
    ];

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="card_content">
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SettingList;
