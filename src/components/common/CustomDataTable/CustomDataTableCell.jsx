import React from 'react';
import { Space, Typography } from 'antd';
import NoticePopover from '../NoticePopover';
import * as dayjs from 'dayjs';

const relativeTime = require('dayjs/plugin/relativeTime');
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const { Text } = Typography;

const CustomDataTableCell = ({ data, type }) => {
    let customCell;
    switch (type) {
        case 'product':
            customCell = (
                <Space>
                    {data.notice != '' ? <NoticePopover data={data.notice} /> : <></>}
                    <Space direction="vertical" size={0}>
                        <Text type="secondary">{data.sku}</Text>
                        <Text strong>
                            {data.name} - {data.attributeValue[0].name}
                        </Text>
                        {data.updatedOn == null ? (
                            <></>
                        ) : (
                            <Text type="secondary">Last update: {dayjs(data.updatedOn).format('DD/MM/YYYY')}</Text>
                        )}
                    </Space>
                </Space>
            );
            break;
        case 'discount':
            customCell = (
                <Space direction="vertical" size={0}>
                    <Space>
                        <Text strong>{data.discountPercent}%</Text>
                        {data.notice != '' ? <NoticePopover data={data.notice} /> : <></>}
                    </Space>

                    {data.updatedOn == null ? (
                        <></>
                    ) : (
                        <Text type="secondary">Last update: {dayjs(data.updatedOn).format('DD/MM/YYYY')}</Text>
                    )}
                </Space>
            );
            break;
        default:
            customCell = (
                <Space direction="vertical" size={0}>
                    <Space>
                        <Text strong>{data.name}</Text>
                        {data.notice != '' ? <NoticePopover data={data.notice} /> : <></>}
                    </Space>
                    {data.updatedOn == null ? (
                        <></>
                    ) : (
                        <Text type="secondary">Last update: {dayjs(data.updatedOn).format('DD/MM/YYYY')}</Text>
                    )}
                </Space>
            );
            break;
    }

    return <>{customCell}</>;
};

export default CustomDataTableCell;
