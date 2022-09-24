import React, { useState, useEffect } from 'react';
import { List, Typography } from 'antd';

const { Text } = Typography;

const useDataList = ({ data, layout }) => {
    const DataList = () => (
        <>
            <List
                itemLayout={layout}
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta title={item.title} key={index} />
                        <Text>{item.text}</Text>
                    </List.Item>
                )}
            />
        </>
    );
    return { DataList };
};

export default useDataList;
