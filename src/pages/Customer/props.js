import { Link } from 'react-router-dom';
import DateTimeFormatter from 'components/common/DateTimeFormatter';
import NoticeModal from 'components/ModalTable/NoticeModal';

export const customerTableColumns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
        width: 50,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={'/customer/' + record.id}>{text}</Link>,
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
    },
    {
        title: 'Created on',
        dataIndex: 'createdOn',
        key: 'createdOn',
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

    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
        width: '50px',
        align: 'center',
        render: (notice) => <NoticeModal data={notice} />,
    },
];
