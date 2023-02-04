import { Link } from 'react-router-dom';
import DateTimeFormatter from 'components/common/CustomFormatter/DateTimeFormatter';

import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';

export const customerTableColumns = [
    {
        title: 'Id',
        key: 'index',
        render: (text, record, index) => record.id,
        width: 50,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <CustomDataTableCell data={record} type="customer" />,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Mobile Number',
        dataIndex: 'mobileNumber',
        key: 'mobileNumber',
        align: 'right',
    },
    {
        title: 'Created on',
        dataIndex: 'createdOn',
        align: 'right',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
        sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
    },
];
