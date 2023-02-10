import React from 'react';
import { Col, Row, Space, Card, Typography, Tag } from 'antd';
import { PeoplesTwo, Peoples } from '@icon-park/react';
import CustomStatisticCard from 'components/common/CustomStatisticCard';

const UserOverviewCard = ({ totalCustomers, totalSuppliers }) => {
    return (
        <Card bordered={false} title="User Overview">
            <Row gutter={[12, 12]} justify="space-between">
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<PeoplesTwo theme="filled" className="dashboard_icon--large" />}
                        number={totalSuppliers}
                        text="Total Supplier(s)"
                        color="blue"
                    />
                </Col>
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<Peoples theme="filled" className="dashboard_icon--large" />}
                        number={totalCustomers}
                        text=" Total Customer(s)"
                        color="geekblue"
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default UserOverviewCard;
