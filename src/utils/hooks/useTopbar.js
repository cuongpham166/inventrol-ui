import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import * as service from '../../api/services';

const { Title } = Typography;

const useTopbar = ({ title, dataId, table }) => {
    const [topbarTitle, setTopbarTitle] = useState('');
    const [topbarSubtitle, setTopbarSubtitle] = useState(table + ' Management');

    console.log(dataId);
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
            <Row justify="space-between">
                <Col>
                    {topbarTitle && (
                        <Title level={3} strong style={{ marginBottom: '0px' }}>
                            {topbarTitle}
                        </Title>
                    )}
                    {topbarSubtitle && (
                        <Title level={5} style={{ marginTop: '0px', fontWeight: '300', textTransform: 'capitalize' }}>
                            {topbarSubtitle}
                        </Title>
                    )}
                </Col>
            </Row>
            <Divider style={{ margin: '10px' }} />
        </>
    );

    return { Topbar };
};

export default useTopbar;
