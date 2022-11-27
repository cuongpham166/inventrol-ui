import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Typography } from 'antd';

import { useParams } from 'react-router-dom';
import Breadcrumb from 'components/common/Breadcrumb';

import usePageHeader from 'utils/hooks/usePageHeader';
import useDataTable from 'utils/hooks/useDataTable';

import * as service from '../../api/services';

import * as subcategoryProps from '../Subcategory/props';

const { Title } = Typography;

const SubcategoryDetail = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const [pageHeaderMainContent, setPageHeaderMainContent] = useState([]);
    const [pageHeaderExtra, setPageHeaderExtra] = useState([]);

    const { PageHeader } = usePageHeader({
        title: '',
        dataId: dataId,
        table: 'subcategory',
        mainContent: pageHeaderMainContent,
        pageHeaderExtra: pageHeaderExtra,
    });

    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: subcategoryProps.subcategoryProductTableColumns,
        table: 'product',
        dataUrl: 'subcategory/' + dataId + '/products',
    });

    const getSubcategoryDataById = async (dataId) => {
        let subcategoryInfoRes = await service.getById('subcategory', dataId);
        let subcategoryPageHeaderObj = subcategoryProps.subcategoryPageHeader(subcategoryInfoRes);
        setPageHeaderMainContent(subcategoryPageHeaderObj.mainContent);
        setPageHeaderExtra(subcategoryPageHeaderObj.pageHeaderExtra);
    };

    useEffect(() => {
        getSubcategoryDataById(dataId);
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

export default SubcategoryDetail;
