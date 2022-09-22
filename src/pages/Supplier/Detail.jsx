import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';

import { useParams } from 'react-router-dom';

import useTopbar from 'utils/hooks/useTopbar';

import * as service from '../../api/services';

const SupplierDetail = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);
    const { Topbar } = useTopbar({
        title: '',
        dataId: dataId,
        table: 'supplier',
    });
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Topbar />
                </Col>
            </Row>
            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px', marginTop: '10px' }}></Row>

            <Row gutter={[16, 16]}></Row>
        </>
    );
};

export default SupplierDetail;
