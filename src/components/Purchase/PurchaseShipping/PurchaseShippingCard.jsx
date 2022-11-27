import React from 'react';
import { Col, Row, Card, Space, Typography } from 'antd';
import { SolutionOutlined, CalendarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import DateFormatter from 'components/common/DateFormatter';
import QrCode from 'components/common/Qrcode';

const { Title, Text } = Typography;
const PurchaseShippingCard = (props) => {
    let pruchaseStatus = props.status;
    let purchaseData = props.data.filter((purchase) => purchase.purchaseshipping.status == pruchaseStatus);
    return (
        <Row gutter={[16, 16]}>
            {purchaseData.map((purchase, index) => {
                return (
                    <Card
                        size="small"
                        key={index}
                        title={
                            <Text>
                                <Link to={'/purchase/' + purchase.id}>Purchase: #{purchase.id}</Link>
                            </Text>
                        }
                    >
                        <Space style={{ marginBottom: '8px' }}>
                            <SolutionOutlined />
                            <Link to={'/supplier/' + purchase.supplier.id}>{purchase.supplier.name}</Link>
                        </Space>

                        <Space style={{ marginBottom: '8px' }}>
                            <CalendarOutlined />
                            <DateFormatter data={purchase.createdOn} />
                        </Space>
                        <QrCode url={'/purchase/' + purchase.id} size={40} />
                    </Card>
                );
            })}
        </Row>
    );
};

export default PurchaseShippingCard;
