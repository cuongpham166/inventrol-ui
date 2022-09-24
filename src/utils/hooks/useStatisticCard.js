import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import '@styles/card.less';
const { Title } = Typography;

const useStatisticCard = ({ data }) => {
    let colNumber = 24 / data.length;
    const StatisticCard = () => (
        <>
            {data.map((element, index) => (
                <Col span={colNumber} key={index}>
                    <Card bordered={false} className="statistic_card">
                        <Row align="middle" gutter={[24, 0]}>
                            <Col xs={6}>
                                <div className="statistic_icon">{element.icon}</div>
                            </Col>
                            <Col xs={18}>
                                <div className="statistic_content">
                                    <span className="statistic_title">
                                        <Title level={1}>{element.title}</Title>
                                    </span>
                                    <span className="statistic_text">
                                        {element.text}
                                        <small className="statistic_percentage">{element.percentage}</small>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </>
    );
    return { StatisticCard };
};

export default useStatisticCard;
