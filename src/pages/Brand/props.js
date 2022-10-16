import { Popover, Descriptions, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

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

export const brandPageHeader = (data) => {
    let pageHeaderObj = {};
    let popoverContent = (
        <div>
            <p>{data.notice}</p>
        </div>
    );

    let mainContent = (
        <Descriptions size="small" column={3}>
            <Descriptions.Item label="Notice">
                <Popover content={popoverContent} title="Notice">
                    <EyeOutlined />
                </Popover>
            </Descriptions.Item>
            <Descriptions.Item label="Created on">{data.createdDate}</Descriptions.Item>
            <Descriptions.Item label="Updated on">{data.updatedDate}</Descriptions.Item>
        </Descriptions>
    );

    let pageHeaderExtra = (
        <>
            <Link to={'/brand/' + data.id + '/edit'}>
                <Button key="1" type="primary" icon={<EditOutlined />}>
                    Update Brand
                </Button>
            </Link>
        </>
    );

    pageHeaderObj = {
        mainContent: mainContent,
        pageHeaderExtra: pageHeaderExtra,
    };
    return pageHeaderObj;
};
