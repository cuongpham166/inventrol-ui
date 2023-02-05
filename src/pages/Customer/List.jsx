import React, { useState, useEffect } from 'react';

import { Col, Row, Card } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';

import * as service from '../../api/services';
import * as customerProps from '../Customer/props';

import CustomDataTable from 'components/common/CustomDataTable';
const CustomerList = (props) => {
    const [dataSource, setDataSource] = useState(null);
    const getAllData = async () => {
        const result = await service.getAll('customer');
        if (result != undefined) {
            result.sort((a, b) => {
                return a.id - b.id;
            });
            setDataSource(result);
        } else {
            setDataSource([]);
        }
    };

    useEffect(() => {
        getAllData();
    }, []);
    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="card_content">
                            <CustomDataTable
                                dataSource={dataSource}
                                columns={customerProps.customerTableColumns}
                                table="customer"
                                dataUrl="customer"
                                CustomFormItems={customerProps.CustomFormMainItems}
                                initialFormValues={customerProps.initialFormValues}
                                formType="create"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CustomerList;
