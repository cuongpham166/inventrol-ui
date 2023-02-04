import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/common/Breadcrumb';

import CustomDataTable from 'components/common/CustomDataTable';

import * as service from '../../api/services';
import * as subcategoryProps from '../Subcategory/props';

const SubcategoryList = (props) => {
    const [dataSource, setDataSource] = useState(null);
    const getAllData = async () => {
        const result = await service.getAll('subcategory');
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
                                columns={subcategoryProps.subcategoryTableColumns}
                                table="subcategory"
                                dataUrl="subcategory"
                                CustomFormItems={subcategoryProps.CustomFormMainItems}
                                initialFormValues={subcategoryProps.initialFormValues}
                                formType="subcategory"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SubcategoryList;
