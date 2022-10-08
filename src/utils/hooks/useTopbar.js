import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import * as service from '../../api/services';
import Breadcrumb from 'components/Breadcrumb';

const { Title } = Typography;

const useTopbar = ({ title, dataId, table }) => {
    const [topbarTitle, setTopbarTitle] = useState('');
    const [topbarSubtitle, setTopbarSubtitle] = useState(table + ' Management');

    useEffect(() => {
        if (dataId != '') {
            let ignore = false;
            const getDataById = async (dataId) => {
                const result = await service.getById(table, dataId);
                let titleValue = result.name;
                if (!ignore) {
                    setTopbarTitle(titleValue);
                }
            };
            getDataById(dataId);
            return () => {
                ignore = true;
            };
        } else {
            setTopbarTitle(title);
        }
    }, []);

    const Topbar = () => (
        <>
            <Col span={24}>
                <Row justify="space-between">
                    <Col>
                        <Breadcrumb />
                        {topbarTitle && (
                            <Title
                                level={3}
                                style={{ marginBottom: '0px', fontWeight: '700' }}
                                className="topbar_title"
                            >
                                {topbarTitle}
                            </Title>
                        )}
                    </Col>
                </Row>
                <Divider style={{ margin: '10px' }} />
            </Col>
        </>
    );

    return { Topbar };
};

export default useTopbar;
