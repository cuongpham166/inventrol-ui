import { Popover } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';

export const brandTableColumns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
        width: 60,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={'/brand/' + record.id}>{text}</Link>,
    },
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: '120px',
    },
    {
        title: 'Updated Date',
        dataIndex: 'updatedDate',
        key: 'updatedDate',
        width: '130px',
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
        width: '50px',
        align: 'center',
        render: (notice) => (
            <Popover content={notice} title="Notice" placement="bottom">
                <EyeOutlined />
            </Popover>
        ),
    },
];
