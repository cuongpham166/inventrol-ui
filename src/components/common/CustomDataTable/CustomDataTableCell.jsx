import React from 'react';
import { Space, Typography } from 'antd';
import NoticePopover from '../NoticePopover';
const { Text } = Typography;

const CustomDataTableCell = ({ data, type }) => {
    let customCell;
    switch (type) {
        case 'product':
            if (data.notice == '') {
                customCell = (
                    <Space direction="vertical" size={0}>
                        <Text type="secondary">{data.sku}</Text>
                        <Text strong>
                            {data.name} - {data.attributeValue[0].name}
                        </Text>
                    </Space>
                );
            } else {
                customCell = (
                    <Space>
                        <NoticePopover data={data.notice} />
                        <Space direction="vertical" size={0}>
                            <Text type="secondary">{data.sku}</Text>
                            <Text strong>
                                {data.name} - {data.attributeValue[0].name}
                            </Text>
                        </Space>
                    </Space>
                );
            }
            break;
        default:
            if (data.notice == '') {
                customCell = <Text strong>{data.name}</Text>;
            } else {
                customCell = (
                    <Space>
                        <Text strong>{data.name}</Text>
                        <NoticePopover data={data.notice} />
                    </Space>
                );
            }
            break;
    }

    return <>{customCell}</>;
};

export default CustomDataTableCell;
