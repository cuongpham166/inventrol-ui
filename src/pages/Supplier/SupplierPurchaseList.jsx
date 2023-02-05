import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Col, Row, Button, Card, Typography } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';

import CustomDataTable from 'components/common/CustomDataTable';

import * as service from '../../api/services';
import * as supplierProps from '../Supplier/props';

const { Title } = Typography;

const SupplierPurchaseList = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const [dataSource, setDataSource] = useState(null);

    const getAllData = async () => {
        const result = await service.getAll('supplier/' + dataId + '/purchases');
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
                                columns={supplierProps.supplierPurchaseTableColumns}
                                table="purchase"
                                dataUrl="purchase"
                                CustomFormItems={<></>}
                                initialFormValues={{}}
                                formType="create"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SupplierPurchaseList;
