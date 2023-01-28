import { Form, Input, Popover, Descriptions, Button, Card, Typography, Space, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

import * as layoutConfig from 'utils/config/layout';

import NoticeModal from 'components/ModalTable/NoticeModal';
import ProductAttributeColum from 'components/ProductTableColumns/ProductAttributeColum';
import ProductModal from 'components/ModalTable/ProductModal';
import DateTimeFormatter from 'components/common/DateTimeFormatter';
import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';

import DateFormatter from 'components/common/DateFormatter';
import CustomActionMenu from 'components/common/CustomActionMenu';

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
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
        sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
    },
    {
        title: 'Created by',
        dataIndex: 'createdBy',
        key: 'createdBy',
        width: '120px',
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
        title: 'Actions',
        dataIndex: 'name',
        key: 'action',
        width: '50px',
        align: 'center',
        render: (text, record) => <CustomActionMenu id={record.id} table="brand" />,
    },
];

export const brandProductTableColumns = [
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
        render: (text, record) => <Link to={'/product/' + record.id}>{text}</Link>,
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
        title: 'Type',
        dataIndex: 'attributeValue',
        key: 'attributeValue',
        render: (attributeValue) => <ProductAttributeColum data={attributeValue} />,
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
        title: () => <Tooltip title="Detailed Information">Info.</Tooltip>,
        dataIndex: 'name',
        key: 'name',
        width: '50px',
        render: (text, record) => <ProductModal data={record} />,
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
