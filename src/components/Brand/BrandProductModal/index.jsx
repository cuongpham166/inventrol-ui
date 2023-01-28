import React, { useState } from 'react';
import { Button, Modal, Tooltip, Typography, Tag, Space, Descriptions, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { InfoOutlined } from '@ant-design/icons';
import DateTimeFormatter from 'components/common/DateTimeFormatter';
import ProductStockStatusCard from 'components/Product/ProductStockStatusCard';
import { $ } from 'moneysafe';
const { Text } = Typography;

const BrandProductModal = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    let productstockDescription;

    let productnameDescription = (
        <Space direction="vertical" size={0}>
            <Text type="secondary">{data.sku}</Text>
            <Text strong>
                {data.name} - {data.attributeValue[0].name}
            </Text>
        </Space>
    );

    if (data.productstock.stockStatus == 'Out of Stock') {
        productstockDescription = <Badge status="error" text="Out of Stock" />;
    } else if (data.productstock.stockStatus == 'In Stock') {
        productstockDescription = <Badge status="success" text="In Stock" />;
    } else {
        productstockDescription = <Badge status="warning" text="Low in Stock" />;
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Tooltip title="View general information">
                <Button onClick={showModal} icon={<InfoOutlined />} size={'small'}></Button>
            </Tooltip>

            <Modal
                title="Product Info"
                open={isModalOpen}
                onOk={handleOk}
                okText={'Close'}
                closable={false}
                centered={true}
                cancelButtonProps={{ style: { display: 'none' } }}
                width={1200}
            >
                <Descriptions title="" bordered column={4}>
                    <Descriptions.Item label="Product" span={2}>
                        {productnameDescription}
                    </Descriptions.Item>
                    <Descriptions.Item label="Subcategory" span={1}>
                        <Link to={'/subcategory/' + data.subcategory.id}> {data.subcategory.name}</Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Category" span={1}>
                        <Link to={'/category/' + data.subcategory.category.id}>{data.subcategory.category.name}</Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={4}>
                        {productstockDescription}
                    </Descriptions.Item>
                    <Descriptions.Item label="Retail Price" span={1}>
                        {$(data.retailPrice).toFixed()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Listing Price" span={1}>
                        {$(data.listingPrice).toFixed()}
                    </Descriptions.Item>
                    <Descriptions.Item label="VAT" span={1}>
                        {data.vat + '%'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Discount" span={1}>
                        {data.discount.discountPercent + '%'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Notice" span={4}>
                        {data.notice}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
};

export default BrandProductModal;
