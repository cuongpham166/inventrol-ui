import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/common/Breadcrumb';

import useDataTable from '../../utils/hooks/useDataTable';

import * as service from '../../api/services';
import * as attributeProps from '../Attribute/props';

const AttributeList = (props) => {
    const [dataTableSource, setDataTableSource] = useState([]);
    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: attributeProps.attributeTableColumns,
        table: 'attribute',
        dataUrl: 'attribute',
    });

    const getAllData = async () => {
        const result = await service.getAll('attribute');
        const tableData = result.filter((element) => element.deleted === false);
        setDataTableSource(tableData);
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
                            <DataTable />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AttributeList;
