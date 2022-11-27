import React, { useState, useEffect } from 'react';
import { Col, Row, Typography, Card } from 'antd';

import { useParams } from 'react-router-dom';
import Breadcrumb from 'components/common/Breadcrumb';

import usePageHeader from 'utils/hooks/usePageHeader';
import useDataTable from 'utils/hooks/useDataTable';

import * as service from '../../api/services';
import * as categoryProps from '../Category/props';

const { Title } = Typography;

const CategoryDetail = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const [pageHeaderMainContent, setPageHeaderMainContent] = useState([]);
    const [pageHeaderExtra, setPageHeaderExtra] = useState([]);

    const { PageHeader } = usePageHeader({
        title: '',
        dataId: dataId,
        table: 'category',
        mainContent: pageHeaderMainContent,
        pageHeaderExtra: pageHeaderExtra,
    });

    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: categoryProps.categoryProductTableColumns,
        table: 'product',
        dataUrl: 'category/' + dataId + '/products',
    });

    const getCategoryDataById = async (dataId) => {
        let categoryInfoRes = await service.getById('category', dataId);
        let categoryPageHeaderObj = categoryProps.categoryPageHeader(categoryInfoRes);
        setPageHeaderMainContent(categoryPageHeaderObj.mainContent);
        setPageHeaderExtra(categoryPageHeaderObj.pageHeaderExtra);
    };

    useEffect(() => {
        getCategoryDataById(dataId);
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

export default CategoryDetail;
