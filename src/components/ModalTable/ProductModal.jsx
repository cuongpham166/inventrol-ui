import React, { useState } from 'react';
import { Button, Modal, List, Typography, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ExpandAltOutlined } from '@ant-design/icons';
import DateTimeFormatter from 'components/DateTimeFormatter';
const { Text } = Typography;

const AttributeListElement = ({ data }) => {
    return (
        <>
            <Link to={'/attribute-value/' + data.id} key={data.name}>
                <Tag key={data.id} color={data.attribute.tagColor}>
                    {data.name}
                </Tag>
            </Link>
        </>
    );
};

const AttributeList = ({ data }) => {
    if (data.length > 1) {
        data.sort((a, b) => {
            return a.attribute.id - b.attribute.id;
        });
    }
    return (
        <>
            {data.map((attr) => {
                return <AttributeListElement data={attr} key={attr.name} />;
            })}
        </>
    );
};

const ProductModal = ({ data }) => {
    let discountValue;
    let tagColor = data.stockStatus === 'Out of Stock' ? 'red' : 'yellow';
    if (data.stockStatus === 'In Stock') {
        tagColor = 'green';
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    if (data.discount.discountPercent === 1.0) {
        discountValue = 'No Discount';
    } else {
        discountValue = data.discount.discountPercent * 100 + '%';
    }

    let listData = [
        {
            title: 'Brand',
            text: <Link to={'/brand/' + data.brand.id}>{data.brand.name}</Link>,
        },
        {
            title: 'Category',
            text: (
                <Link to={'/subcategory/' + data.subcategory.id}>
                    <Tag color={data.subcategory.tagColor}>{data.subcategory.name}</Tag>
                </Link>
            ),
        },
        {
            title: 'Type',
            text: <AttributeList data={data.attributeValue} />,
        },
        {
            title: 'Barcode',
            text: data.barcode,
        },
        {
            title: 'SKU',
            text: data.sku,
        },
        {
            title: 'Listing Price',
            text: data.listingPrice,
        },
        {
            title: 'Retail Price',
            text: data.retailPrice,
        },
        {
            title: 'VAT',
            text: data.vat * 100 + '%',
        },
        {
            title: 'Current Discount',
            text: discountValue,
        },
        {
            title: 'Created on',
            text: <DateTimeFormatter data={data.createdOn} />,
        },
        {
            title: 'Updated on',
            text: <DateTimeFormatter data={data.updatedOn} />,
        },
    ];

    return (
        <>
            <Button onClick={showModal} icon={<ExpandAltOutlined />}></Button>
            <Modal
                title={
                    <Space>
                        <Link to={'/product/' + data.id}>{data.name}</Link>
                        <Tag color={tagColor}>{data.stockStatus}</Tag>
                    </Space>
                }
                open={isModalOpen}
                onOk={handleOk}
                okText={'Close'}
                closable={false}
                centered={true}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <List
                    dataSource={listData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta title={item.title} key={index} />
                            <Text>{item.text}</Text>
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
};

export default ProductModal;
