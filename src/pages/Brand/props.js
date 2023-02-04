import { Form, Input, Popover, Descriptions, Button, Card, Typography, Space, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

import * as layoutConfig from 'utils/config/layout';

import DateTimeFormatter from 'components/common/CustomFormatter/DateTimeFormatter';
import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';

import BrandActionMenu from 'components/Brand/BrandActionMenu';

const { Title } = Typography;

export const brandTableColumns = [
    {
        title: 'Id',
        key: 'index',
        render: (text, record, index) => record.id,
        width: 60,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <CustomDataTableCell data={record} type="brand" />,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Created on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        align: 'right',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
        sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
    },
    {
        title: 'Actions',
        dataIndex: 'name',
        key: 'action',
        width: '50px',
        align: 'center',
        render: (text, record) => <BrandActionMenu id={record.id} table="brand" />,
    },
];

export const brandProductTableColumns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => record.id,
        width: 60,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <CustomDataTableCell data={record} type="product" />,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Category',
        dataIndex: 'subcategory',
        key: 'subcategory',
        render: (subcategory) => (
            <Space size={0}>
                <Link to={'/category/' + subcategory.category.id}>
                    <Tag color={subcategory.category.tagColor}>{subcategory.category.name}</Tag>
                </Link>
                <Link to={'/subcategory/' + subcategory.id}>
                    <Tag color={subcategory.tagColor}>{subcategory.name}</Tag>
                </Link>
            </Space>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'productstock',
        key: 'productstock',
        render: (productstock) => {
            let tagColor = productstock.stockStatus === 'Out of Stock' ? 'red' : 'yellow';
            if (productstock.stockStatus === 'In Stock') {
                tagColor = 'green';
            }
            return <Tag color={tagColor}>{productstock.stockStatus}</Tag>;
        },
    },
    {
        title: 'Action',
        dataIndex: 'name',
        key: 'action',
        width: '50px',
        align: 'center',
        render: (text, record) => (
            <Space>
                <Link to={'/product/' + record.id}>
                    <Tooltip title="View Detail">
                        <Button type="primary" icon={<EyeOutlined />} size={'small'} />
                    </Tooltip>
                </Link>
            </Space>
        ),
    },
];
export const initialFormValues = {
    notice: '',
};

export const CustomFormMainItems = () => {
    const formLayout = layoutConfig.form;

    return (
        <>
            <Form.Item
                label="Name"
                name="name"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Name" />
            </Form.Item>

            <Form.Item label="Notice" name="notice">
                <Input.TextArea allowClear showCount placeholder="Notice" />
            </Form.Item>
        </>
    );
};
