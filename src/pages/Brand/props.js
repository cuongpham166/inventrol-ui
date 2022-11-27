import { Form, Input, Popover, Descriptions, Button, Card, Typography, Space, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

import * as layoutConfig from 'utils/config/layout';

import NoticeModal from 'components/ModalTable/NoticeModal';
import ProductAttributeColum from 'components/ProductTableColumns/ProductAttributeColum';
import ProductModal from 'components/ModalTable/ProductModal';
import DateTimeFormatter from 'components/common/DateTimeFormatter';
import DateFormatter from 'components/common/DateFormatter';

const { Title } = Typography;

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
        title: 'Created on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
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
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
        width: '50px',
        align: 'center',
        render: (notice) => <NoticeModal data={notice} />,
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

export const brandPageHeader = (data) => {
    let pageHeaderObj = {};
    let mainContent = (
        <Descriptions size="small" column={3}>
            <Descriptions.Item label="Created on">
                <DateFormatter data={data.createdOn} />
            </Descriptions.Item>
            <Descriptions.Item label="Updated on">
                <DateFormatter data={data.updatedOn} />
            </Descriptions.Item>
            <Descriptions.Item label="Notice">
                <NoticeModal data={data.notice} />
            </Descriptions.Item>
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

export const CustomFormMainItems = () => {
    const formLayout = layoutConfig.form;

    return (
        <>
            <Card bordered={false} style={{ padding: '0px' }}>
                <div className="card_header">
                    <Title level={4}>Brand Information</Title>
                </div>
                <div className="card_content">
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
                    <Form.Item {...formLayout.tailLayout} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} className="form_button">
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Card>
        </>
    );
};
