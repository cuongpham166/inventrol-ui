import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Typography, Space } from 'antd';
import * as service from '../../../api/services';

const { Text, Link } = Typography;

const SupplierInfo = ({ supplierId }) => {
    const [dataSource, setDataSource] = useState(null);
    const [name, setName] = useState(null);
    const getSupplierById = async (supplierId) => {
        const result = await service.getById('supplier', supplierId);
        setDataSource(result);
        setName(result.name);
        console.log('result', result);
    };

    useEffect(() => {
        getSupplierById(supplierId);
    }, []);

    return (
        <Card bordered={false} title="Supplier Summary">
            <Descriptions bordered column={4}>
                <Descriptions.Item label="Name" span={2}>
                    {dataSource != null ? dataSource.name : ''}
                </Descriptions.Item>
                <Descriptions.Item label="Contact Person" span={2}>
                    {dataSource != null ? dataSource.contactPerson : ''}
                </Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>
                    {dataSource != null ? (
                        <Text>
                            {dataSource.contact.mainAddressLine}, {dataSource.contact.cityInfo},{' '}
                            {dataSource.contact.country}
                        </Text>
                    ) : (
                        ''
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Additional Link" span={2}>
                    {dataSource != null ? <Text>{dataSource.contact.additionalAddressLine}</Text> : ''}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default SupplierInfo;
