import React, { useState, useEffect } from 'react';

import { Form, Input, Popover, Tag, Select, Typography, Card, Button, Modal, Tooltip, Descriptions } from 'antd';
import { Link } from 'react-router-dom';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';

import { EyeOutlined, SaveOutlined, ExpandAltOutlined, EditOutlined } from '@ant-design/icons';
import * as service from '../../api/services';
import { $ } from 'moneysafe';
import * as layoutConfig from 'utils/config/layout';
import SubcategoryModal from 'components/ModalTable/SubcategoryModal';
import NoticeModal from 'components/ModalTable/NoticeModal';
import DateTimeFormatter from 'components/common/DateTimeFormatter';
import DateFormatter from 'components/common/DateFormatter';
import ProductAttributeColum from 'components/ProductTableColumns/ProductAttributeColum';

const { Option } = Select;
const { Title, Text } = Typography;
export const initialFormValues = {
    notice: '',
    tagColor: '#7a3db8',
    subategory: [],
};

export const CustomFormMainItems = () => {
    const [blockPickerColor, setBlockPickerColor] = useState('#7a3db8');
    const formLayout = layoutConfig.form;

    const onChangeColor = (color) => {
        setBlockPickerColor(color.hex);
    };

    return (
        <>
            <Card bordered={false} style={{ padding: '0px' }}>
                <div className="card_header">
                    <Title level={4}>Category Information</Title>
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
                    <Form.Item
                        label="Tag Color"
                        name="tagColor"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Colorpicker
                            popup
                            blockStyles={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                            }}
                            picker={'SketchPicker'}
                            onChange={onChangeColor}
                            value={blockPickerColor}
                        />
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

export const categoryTableColumns = [
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
        render: (text, record) => <Link to={'/category/' + record.id}>{text}</Link>,
    },
    {
        title: 'Color',
        dataIndex: 'tagColor',
        key: 'tagColor',
        width: '50px',
        render: (tagColor) => <Tag color={tagColor}>{tagColor}</Tag>,
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
        title: () => <Tooltip title="Subcategory">Subcat.</Tooltip>,
        dataIndex: 'subcategory',
        key: 'subcategory',
        align: 'center',
        width: '50px',
        render: (subcategory) => <SubcategoryModal data={subcategory} />,
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

export const categoryProductTableColumns = [
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
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
        render: (brand) => <Link to={'/brand/' + brand.id}>{brand.name}</Link>,
    },
    {
        title: 'Retail Price',
        dataIndex: 'retailPrice',
        key: 'retailPrice',
        render: (retailPrice) => <Text>{$(retailPrice).toFixed()} </Text>,
    },
    {
        title: 'Listing Price',
        dataIndex: 'listingPrice',
        key: 'listingPrice',
        render: (listingPrice) => <Text>{$(listingPrice).toFixed()} </Text>,
    },
    {
        title: 'Subcategory',
        dataIndex: 'subcategory',
        key: 'subcategory',
        render: (subcategory) => (
            <Link to={'/subcategory/' + subcategory.id}>
                <Tag color={subcategory.tagColor}>{subcategory.name}</Tag>
            </Link>
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
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
        width: '50px',
        align: 'center',
        render: (notice) => <NoticeModal data={notice} />,
    },
];

export const categoryPageHeader = (data) => {
    let pageHeaderObj = {};
    let mainContent = (
        <Descriptions size="small" column={4}>
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
            <Link to={'/category/' + data.id + '/edit'}>
                <Button key="1" type="primary" icon={<EditOutlined />}>
                    Update Category
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
