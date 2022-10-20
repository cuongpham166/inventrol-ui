import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Col, Row, Card, Typography } from 'antd';

import Breadcrumb from 'components/Breadcrumb';

import usePageHeader from 'utils/hooks/usePageHeader';
import useDataTable from 'utils/hooks/useDataTable';

import * as service from '@services';

import * as attributeValueProps from '../AttributeValue/props';
import * as productProps from '../Product/props';

const { Title, Text } = Typography;

const AttributeValueDetail = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const [pageHeaderMainContent, setPageHeaderMainContent] = useState([]);
    const [pageHeaderExtra, setPageHeaderExtra] = useState([]);
    const { PageHeader } = usePageHeader({
        title: '',
        dataId: dataId,
        table: 'attribute-value',
        mainContent: pageHeaderMainContent,
        pageHeaderExtra: pageHeaderExtra,
    });

    const [dataTableSource, setDataTableSource] = useState([]);
    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: productProps.productTableColumns,
        table: 'product',
        dataUrl: 'attribute-value/' + dataId + '/products',
    });

    const getAttributeValueDataById = async (dataId) => {
        let attributeValueInfoRes = await service.getById('attribute-value', dataId);
        let attributeValuePageHeaderObj = attributeValueProps.attributeValuePageHeader(attributeValueInfoRes);
        setPageHeaderMainContent(attributeValuePageHeaderObj.mainContent);
        setPageHeaderExtra(attributeValuePageHeaderObj.pageHeaderExtra);
        setDataTableSource(attributeValueInfoRes.product);
    };

    useEffect(() => {
        getAttributeValueDataById(dataId);
    }, []);

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            <Row>
                <PageHeader />
            </Row>
            <Row gutter={[24, 0]}>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="card_header">
                            <Title level={4}>Products</Title>
                        </div>
                        <div className="card_content">
                            <DataTable />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AttributeValueDetail;
