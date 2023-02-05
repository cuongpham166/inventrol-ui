import React from 'react';
import { Col, Row, Space, Card, Typography, Tag } from 'antd';
import { PeoplesTwo, Peoples } from '@icon-park/react';
import CustomStatisticCard from 'components/common/CustomStatisticCard';

const SupplierProductStatistic = (props) => {
    return (
        <Card bordered={false} title="Product Summary">
            <Row gutter={[12, 12]} justify="space-between">
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<PeoplesTwo theme="filled" className="dashboard_icon--large" />}
                        number="5"
                        text="New Products"
                        color="blue"
                    />
                </Col>
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<Peoples theme="filled" className="dashboard_icon--large" />}
                        number="5"
                        text="Total Products"
                        color="geekblue"
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default SupplierProductStatistic;
