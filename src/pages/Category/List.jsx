import React, { useState, useEffect } from 'react';

import { Col, Row, Card } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';

import * as service from '../../api/services';
import * as categoryProps from '../Category/props';

import CustomDataTable from 'components/common/CustomDataTable';

const CategoryList = (props) => {
    const [dataSource, setDataSource] = useState(null);
    const getAllData = async () => {
        const result = await service.getAll('category');
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
                                columns={categoryProps.categoryTableColumns}
                                table="category"
                                dataUrl="category"
                                CustomFormItems={categoryProps.CustomFormMainItems}
                                initialFormValues={categoryProps.initialFormValues}
                                formType="create"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CategoryList;
