import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Table, Divider, Typography, Button, InputNumber, Select, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;

const PurchaseSummaryProductColumn = (props) => {
    let product = props.product;
    let cartData = props.cartdata;

    let attributeText = '';
    product.attributeValue.map((value) => {
        attributeText += value.name;
    });

    const handleRemoveProduct = (productId) => {
        let updatedCart = cartData.filter((element) => element.id != productId);
        return props.onClick(updatedCart);
        console.log(updatedCart);
    };

    const handleChangeQuantity = (value, productId) => {
        console.log('value', value);
        console.log('productId', productId);
    };

    return (
        <Space direction="vertical" size={0}>
            <Text strong>{product.name}</Text>
            <Text>{attributeText}</Text>
            <Space style={{ marginTop: '5px' }}>
                <Button icon={<DeleteOutlined />} onClick={handleRemoveProduct(product.id)}></Button>
                <InputNumber
                    min={1}
                    max={100}
                    defaultValue={1}
                    onChange={(e) => {
                        handleChangeQuantity(e, product.id);
                    }}
                />
            </Space>
        </Space>
    );
};

export default PurchaseSummaryProductColumn;
