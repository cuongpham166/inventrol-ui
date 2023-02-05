import React, { useState, useEffect } from 'react';

import { Col, Row, Button, Card } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';
import CustomDataTable from 'components/common/CustomDataTable';

import * as service from '../../api/services';
import * as supplierProps from '../Supplier/props';

const SupplierList = (props) => {
    const [dataSource, setDataSource] = useState(null);
    const getAllData = async () => {
        const result = await service.getAll('supplier');
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
                                columns={supplierProps.supplierTableColumns}
                                table="supplier"
                                dataUrl="supplier"
                                CustomFormItems={supplierProps.CustomFormMainItems}
                                initialFormValues={supplierProps.initialFormValues}
                                formType="create"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SupplierList;
