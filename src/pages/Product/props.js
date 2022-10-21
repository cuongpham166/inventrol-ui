import React, { useState, useEffect, useRef } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Popover,
    Button,
    Tag,
    Space,
    Descriptions,
    Statistic,
    InputNumber,
    Select,
    Modal,
    Card,
    Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import {
    ShopOutlined,
    FormOutlined,
    EyeOutlined,
    BarcodeOutlined,
    TagsOutlined,
    TagOutlined,
    CodeSandboxOutlined,
    BellOutlined,
    MoneyCollectOutlined,
    EditOutlined,
    QuestionCircleOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import * as service from '../../api/services';
import * as layoutConfig from 'utils/config/layout';

import skuGenerator from 'utils/functions/skuGenerator';

const { Option } = Select;
const { Title } = Typography;

export const productDataList = (data) => {
    let statusColor;
    let productType = '';

    data.attributeValue.map((attr, index) => {
        productType += attr.name;
    });

    data.stockStatus == 'Out of Stock' ? (statusColor = 'red') : (statusColor = 'yellow');
    if (data.stockStatus == 'In Stock') {
        statusColor = 'green';
    }

    let popoverContent = (
        <div>
            <p>{data.notice}</p>
        </div>
    );

    let listData = [
        {
            title: (
                <Tooltip placement="top" title={'Name'} color="#7A3DB8">
                    <CodeSandboxOutlined className="list_icon" />
                </Tooltip>
            ),
            text: (
                <>
                    <Link to={'/brand/' + data.brand.id}>{data.brand.name}</Link> - <span>{data.name}</span>
                </>
            ),
        },
        {
            title: (
                <Tooltip placement="top" title={'Type'} color="#7A3DB8">
                    <TagsOutlined className="list_icon" />
                </Tooltip>
            ),
            text: productType,
        },
        {
            title: (
                <Tooltip placement="top" title={'Category'} color="#7A3DB8">
                    <TagsOutlined className="list_icon" />
                </Tooltip>
            ),
            text: (
                <Space>
                    <Link to={'/subcategory/' + data.subcategory.id}>
                        <Tag>{data.subcategory.name}</Tag>
                    </Link>
                    <Link to={'/category/' + data.subcategory.category.id}>
                        <Tag>{data.subcategory.category.name}</Tag>
                    </Link>
                </Space>
            ),
        },
        {
            title: (
                <Tooltip placement="top" title={'Stock Status'} color="#7A3DB8">
                    <BellOutlined className="list_icon" />
                </Tooltip>
            ),
            text: <Tag color={statusColor}>{data.stockStatus}</Tag>,
        },
        {
            title: (
                <Tooltip placement="top" title={'Quantity'} color="#7A3DB8">
                    <ShopOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.quantity,
        },
        {
            title: (
                <Tooltip placement="top" title={'Current Price'} color="#7A3DB8">
                    <MoneyCollectOutlined className="list_icon" />
                </Tooltip>
            ),
            text: (
                <Space size="small">
                    <Tooltip placement="top" title={'Listing Price'} color="#7A3DB8">
                        {data.listingPrice + '€'}
                    </Tooltip>
                    <span> / </span>
                    <Tooltip placement="top" title={'Retail Price'} color="#7A3DB8">
                        {data.retailPrice + '€'}
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: (
                <Tooltip placement="top" title={'VAT'} color="#7A3DB8">
                    <MoneyCollectOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.vat * 100 + '%',
        },
        {
            title: (
                <Tooltip placement="top" title={'Barcode'} color="#7A3DB8">
                    <BarcodeOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.barcode,
        },
        {
            title: (
                <Tooltip placement="top" title={'SKU'} color="#7A3DB8">
                    <TagOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.sku,
        },
        {
            title: (
                <Tooltip placement="top" title={'Notice'} color="#7A3DB8">
                    <FormOutlined className="list_icon" />
                </Tooltip>
            ),
            text: (
                <Popover content={popoverContent} title="Notice">
                    <EyeOutlined />
                </Popover>
            ),
        },
        {
            title: (
                <Tooltip placement="top" title={'Update Product'} color="#7A3DB8">
                    <EditOutlined className="list_icon" />
                </Tooltip>
            ),
            text: (
                <Link to={'/inventory/' + data.id + '/edit'}>
                    <Button type="primary">Update Product</Button>
                </Link>
            ),
        },
    ];
    return listData;
};

export const productPageHeader = (data) => {
    let statusTagColor;
    let pageHeaderObj = {};
    let productTypeList = [];

    let popoverContent = (
        <div>
            <p>{data.notice}</p>
        </div>
    );
    let stockStatus = data.stockStatus;

    stockStatus === 'Out of Stock' ? (statusTagColor = 'red') : (statusTagColor = 'yellow');
    if (stockStatus === 'In Stock') {
        statusTagColor = 'green';
    }

    data.attributeValue.map((val, index) => {
        let productTypeElement = (
            <Link to={'/attribute-value/' + val.id}>
                <Tag key={index} color={val.attribute.tagColor}>
                    {val.name}
                </Tag>
            </Link>
        );
        productTypeList.push(productTypeElement);
    });

    let mainContent = (
        <Descriptions size="small" column={2}>
            <Descriptions.Item label="Brand">
                <Link to={'/brand/' + data.brand.id}>{data.brand.name}</Link>
            </Descriptions.Item>
            <Descriptions.Item label="SKU">{data.sku}</Descriptions.Item>
            <Descriptions.Item label="Category">
                <Link to={'/subcategory/' + data.subcategory.id}>
                    <Tag color={data.subcategory.tagColor}>{data.subcategory.name}</Tag>
                </Link>
                <Link to={'/category/' + data.subcategory.category.id}>
                    <Tag color={data.subcategory.category.tagColor}>{data.subcategory.category.name}</Tag>
                </Link>
            </Descriptions.Item>
            <Descriptions.Item label="Barcode">{data.barcode}</Descriptions.Item>
            <Descriptions.Item label="Type">{productTypeList}</Descriptions.Item>
            <Descriptions.Item label="Created on">{data.createdDate}</Descriptions.Item>
            <Descriptions.Item label="Notice">
                <Popover content={popoverContent} title="Notice">
                    <EyeOutlined />
                </Popover>
            </Descriptions.Item>
        </Descriptions>
    );

    let extraContent = (
        <div
            style={{
                display: 'flex',
                width: 'max-content',
                justifyContent: 'flex-end',
                gap: '30px',
            }}
        >
            <Statistic title="Retail Price" prefix="€" precision={2} value={data.retailPrice} />
            <Statistic title="Listing Price" prefix="€" precision={2} value={data.listingPrice} />
            <Statistic title="VAT" suffix="%" value={data.vat * 100} />
        </div>
    );

    let pageHeaderTag = (
        <span>
            <Tag color={statusTagColor} style={{ marginRight: '8px' }}>
                {stockStatus.toUpperCase()}
            </Tag>
            <Tooltip placement="top" title={'Current Quantity: ' + data.quantity}>
                <QuestionCircleOutlined />
            </Tooltip>
        </span>
    );

    let pageHeaderExtra = (
        <>
            <Link to={'/inventory/' + data.id + '/edit'}>
                <Button key="1" type="primary" icon={<EditOutlined />}>
                    Update Product
                </Button>
            </Link>
        </>
    );

    pageHeaderObj = {
        mainContent: mainContent,
        extraContent: extraContent,
        pageHeaderTag: pageHeaderTag,
        pageHeaderExtra: pageHeaderExtra,
    };
    return pageHeaderObj;
};

export const productTableColumns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
        width: 60,
    },
    {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={'/inventory/' + record.id}>{text}</Link>,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
        render: (brand) => <Link to={'/brand/' + brand.id}>{brand.name}</Link>,
    },
    {
        title: 'Category',
        dataIndex: 'subcategory',
        key: 'subcategory',
        width: '170px',
        render: (subcategory) => (
            <div className="taglist_container">
                <Link to={'/category/' + subcategory.category.id}>
                    <Tag color={subcategory.category.tagColor}>{subcategory.category.name}</Tag>
                </Link>
                <Link to={'/subcategory/' + subcategory.id}>
                    <Tag color={subcategory.tagColor}>{subcategory.name}</Tag>
                </Link>
            </div>
        ),
    },
    {
        title: 'Type',
        dataIndex: 'attributeValue',
        key: 'attributeValue',
        render: (attributeValue) => (
            <div>
                {attributeValue.map((attr) => {
                    return (
                        <Link to={'/attribute-value/' + attr.id} key={attr.name}>
                            <Tag key={attr.id} color={attr.attribute.tagColor}>
                                {attr.name}
                            </Tag>
                        </Link>
                    );
                })}
            </div>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'stockStatus',
        key: 'stockStatus',
        render: (stockStatus) => {
            let tagColor = stockStatus === 'Out of Stock' ? 'red' : 'yellow';
            if (stockStatus === 'In Stock') {
                tagColor = 'green';
            }
            return <Tag color={tagColor}>{stockStatus.toUpperCase()}</Tag>;
        },
    },
    {
        title: 'VAT',
        dataIndex: 'vat',
        key: 'vat',
    },
    {
        title: 'Retail Price',
        dataIndex: 'retailPrice',
        key: 'retailPrice',
    },
    {
        title: 'Listing Price',
        dataIndex: 'listingPrice',
        key: 'listingPrice',
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        width: '50px',
        align: 'center',
        key: 'notice',
        render: (notice) => {
            let popoverContent = (
                <div>
                    <p>{notice}</p>
                </div>
            );
            return (
                <Popover content={popoverContent} title="Notice" placement="bottom">
                    <EyeOutlined />
                </Popover>
            );
        },
    },
];

export const initialFormValues = {
    notice: '',
};

export const CustomFormMainItems = () => {
    const [attributeValueList, setAttributeValueList] = useState([]);
    const [subcategoryDataSource, setSubategoryDataSource] = useState([]);
    const [brandDataSource, setBrandDataSource] = useState([]);
    const [supplierList, setSupplierList] = useState([]);
    const formLayout = layoutConfig.form;

    useEffect(() => {
        getAllAttributevalues();
        getAllSubcategories();
        getAllBrands();
        getAllSuppliers();
    }, []);

    const getAllAttributevalues = async () => {
        let listResult = [];
        const result = await service.getAll('attribute-value');
        result.map((val, idx) => {
            listResult.push(
                <Option key={val.id} value={val.name}>
                    {val.name}
                </Option>,
            );
        });
        setAttributeValueList(listResult);
    };

    const getAllSuppliers = async () => {
        let supList = [];
        let suppliers = await service.getAll('supplier');
        suppliers.map((val, idx) => {
            supList.push(
                <Option key={val.id} value={val.name}>
                    {val.name}
                </Option>,
            );
        });
        setSupplierList(supList);
    };

    const getAllSubcategories = async () => {
        const subcategories = await service.getAll('subcategory');
        setSubategoryDataSource(subcategories);
    };

    const getAllBrands = async () => {
        const brands = await service.getAll('brand');
        setBrandDataSource(brands);
    };

    return (
        <>
            <Card bordered={false} style={{ padding: '0px' }}>
                <div className="card_header">
                    <Title level={4}>Product Information</Title>
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
                        name="brand"
                        label="Brand"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select placeholder="Please select a brand">
                            {brandDataSource.map((option) => (
                                <Option key={option.id} value={option.name}>
                                    {option.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="SKU"
                        name="sku"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="SKU" disabled />
                    </Form.Item>
                    <Form.Item
                        label="Barcode"
                        name="barcode"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="barcode" disabled />
                    </Form.Item>
                    <Form.Item label="Price">
                        <Input.Group compact>
                            <Form.Item name="vat" noStyle rules={[{ required: true, message: ' VAT is required' }]}>
                                <InputNumber
                                    style={{ width: 'calc(20% - 8px)' }}
                                    placeholder="VAT"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                />
                            </Form.Item>
                            <Form.Item
                                name="listingPrice"
                                noStyle
                                rules={[{ required: true, message: 'Listing Price is required' }]}
                            >
                                <InputNumber
                                    style={{ width: 'calc(40% - 8px)', marginLeft: '8px', marginRight: '8px' }}
                                    placeholder="Listing Price"
                                    min="0"
                                    max="1000000"
                                    step="1"
                                />
                            </Form.Item>
                            <Form.Item
                                name="retailPrice"
                                noStyle
                                rules={[{ required: true, message: 'Retail Price is required' }]}
                            >
                                <InputNumber
                                    style={{ width: 'calc(40% - 8px)' }}
                                    placeholder="Retail Price"
                                    min="0"
                                    max="1000000"
                                    step="1"
                                />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item
                        name="attributeValue"
                        label="Type"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select types"
                        >
                            {attributeValueList}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="subcategory"
                        label="Subcategory"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select placeholder="Please select a subcategory">
                            {subcategoryDataSource.map((option) => (
                                <Option key={option.id} value={option.name}>
                                    {option.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="supplier"
                        label="Supplier"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select supplier(s)"
                        >
                            {supplierList}
                        </Select>
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
