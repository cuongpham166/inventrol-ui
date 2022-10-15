import { Popover, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';

export const attributeTableColumns = [
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
        render: (text, record) => <Link to={'/attribute/' + record.id}>{text}</Link>,
    },
    {
        title: 'Attribute Values',
        dataIndex: 'attributevalue',
        key: 'attributevalue',
        render: (attributevalue) => (
            <div>
                {attributevalue.map((val) => {
                    return (
                        <Link to={'/attribute-value/' + val.id} key={val.name}>
                            <Tag key={val.id} color="default">
                                {val.name}
                            </Tag>
                        </Link>
                    );
                })}
            </div>
        ),
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
