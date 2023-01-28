import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';
import CustomDataTable from 'components/common/CustomDataTable';

import * as brandProps from '../Brand/props';
import * as service from '../../api/services';

const BrandList = (props) => {
    const [dataSource, setDataSource] = useState(null);
    const getAllData = async () => {
        const result = await service.getAll('brand');
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
                                columns={brandProps.brandTableColumns}
                                table="brand"
                                dataUrl="brand"
                                CustomFormItems={brandProps.CustomFormMainItems}
                                initialFormValues={brandProps.initialFormValues}
                                formType="create"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default BrandList;
