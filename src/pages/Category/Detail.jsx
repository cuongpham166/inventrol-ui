import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';

import { useParams } from 'react-router-dom';
import Breadcrumb from 'components/common/Breadcrumb';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as service from '../../api/services';

const CategoryDetail = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const { PageHeader } = usePageHeader({
        title: '',
        dataId: dataId,
        table: 'category',
        pageHeaderExtra: <></>,
    });

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            <Row>
                <PageHeader />
            </Row>
            <Row Row gutter={[24, 24]} style={{ marginBottom: '24px' }}></Row>
        </>
    );
};

export default CategoryDetail;
