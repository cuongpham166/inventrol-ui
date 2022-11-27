import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Col, Row, Card, Typography } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';

import usePageHeader from 'utils/hooks/usePageHeader';
import useDataTable from 'utils/hooks/useDataTable';

import * as service from '@services';

import * as brandProps from '../Brand/props';

const { Title, Text } = Typography;

const BrandDetail = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const [pageHeaderMainContent, setPageHeaderMainContent] = useState([]);
    const [pageHeaderExtra, setPageHeaderExtra] = useState([]);
    const { PageHeader } = usePageHeader({
        title: '',
        dataId: dataId,
        table: 'brand',
        mainContent: pageHeaderMainContent,
        pageHeaderExtra: pageHeaderExtra,
    });

    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: brandProps.brandProductTableColumns,
        table: 'product',
        dataUrl: 'brand/' + dataId + '/products',
    });

    const getBrandDataById = async (dataId) => {
        let brandInfoRes = await service.getById('brand', dataId);
        let brandPageHeaderObj = brandProps.brandPageHeader(brandInfoRes);
        setPageHeaderMainContent(brandPageHeaderObj.mainContent);
        setPageHeaderExtra(brandPageHeaderObj.pageHeaderExtra);
    };

    useEffect(() => {
        getBrandDataById(dataId);
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

export default BrandDetail;
