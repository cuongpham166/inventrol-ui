import React from 'react';
import { Card, Descriptions, Typography, Space } from 'antd';

const { Text, Link } = Typography;

const SupplierInfo = ({ supplierData }) => {
    return (
        <Card bordered={false} title="Supplier Summary">
            <Descriptions bordered column={4}>
                <Descriptions.Item label="Name" span={2}>
                    {supplierData.name}
                </Descriptions.Item>
                <Descriptions.Item label="Contact Person" span={2}>
                    {supplierData.contactPerson}
                </Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>
                    <Text>
                        {supplierData.contact.mainAddressLine}, {supplierData.contact.cityInfo},{' '}
                        {supplierData.contact.country}
                    </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Additional Link" span={2}>
                    <Text>{supplierData.contact.additionalAddressLine}</Text>
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default SupplierInfo;
