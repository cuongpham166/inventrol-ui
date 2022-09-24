import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';

import { useParams } from 'react-router-dom';

import useTopbar from 'utils/hooks/useTopbar';

import * as service from '../../api/services';

const SubcategoryDetail = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);
    const { Topbar } = useTopbar({
        title: '',
        dataId: dataId,
        table: 'subcategory',
    });

    return (
        <>
            <Topbar />

            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px', marginTop: '10px' }}></Row>

            <Row gutter={[16, 16]}></Row>
        </>
    );
};

export default SubcategoryDetail;
