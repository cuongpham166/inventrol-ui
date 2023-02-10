import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import DateTimeFormatter from 'components/common/CustomFormatter/DateTimeFormatter';
import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';

const { Text } = Typography;

export const discountTableColumns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
        width: 60,
    },
    {
        title: 'Discount Percent',
        dataIndex: 'discountPercent',
        key: 'discountPercent',
        align: 'right',
        render: (text, record) => <CustomDataTableCell data={record} type="discount" />,
    },
    {
        title: 'Created on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        align: 'right',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
    },
    {
        title: 'Created by',
        dataIndex: 'createdBy',
        key: 'createdBy',
    },
    {
        title: 'Updated on',
        dataIndex: 'updatedOn',
        key: 'updatedOn',
        render: (updatedOn) => <DateTimeFormatter data={updatedOn} />,
    },
    {
        title: 'Updated by',
        dataIndex: 'updatedBy',
        key: 'updatedBy',
    },
];
