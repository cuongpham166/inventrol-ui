import React from 'react';
import { Card, Tag, List, Typography, Space } from 'antd';

import * as dayjs from 'dayjs';

const { Text } = Typography;

const SearchSettingStatistic = ({ serverStatus, statList, lastUpdate }) => {
    return (
        <>
            <Card title="Meilisearch Server Health" style={{ marginBottom: '24px' }}>
                {serverStatus == 'available' ? (
                    <Tag color="success" style={{ textTransform: 'capitalize' }}>
                        {serverStatus}
                    </Tag>
                ) : (
                    <Tag color="error" style={{ textTransform: 'capitalize' }}>
                        {serverStatus}
                    </Tag>
                )}
            </Card>
            <Card title="Meilisearch Statistics">
                <List
                    bordered
                    dataSource={statList}
                    renderItem={(item) => (
                        <List.Item>
                            <Space
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text style={{ textTransform: 'capitalize' }} strong>
                                    {item.name}
                                </Text>
                                <Text>{item.numberOfDocuments} Record(s)</Text>
                            </Space>
                        </List.Item>
                    )}
                />
                <Space
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginTop: '10px',
                    }}
                >
                    <Text strong>Last update</Text>
                    <Text>{dayjs(lastUpdate).format('DD/MM/YYYY')}</Text>
                </Space>
            </Card>
        </>
    );
};

export default SearchSettingStatistic;
