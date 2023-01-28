import React from 'react';
import { Space, Typography } from 'antd';
import NoticeModal from 'components/ModalTable/NoticeModal';

const { Text } = Typography;

const CustomDataTableCell = ({ data }) => {
    let customCell;

    if (data.notice == '') {
        customCell = <Text strong>{data.name}</Text>;
    } else {
        customCell = (
            <Space>
                <Text strong>{data.name}</Text>
                <NoticeModal data={data.notice} />
            </Space>
        );
    }
    return <>{customCell}</>;
};

export default CustomDataTableCell;
