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
import { Link, useNavigate } from 'react-router-dom';
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
    PlusOutlined,
} from '@ant-design/icons';
import * as service from '../../api/services';
import * as layoutConfig from 'utils/config/layout';
import { $ } from 'moneysafe';

import ProductStockStatusCard from 'components/Product/ProductStockStatusCard';
import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';

const { Option, OptGroup } = Select;
const { Title, Text } = Typography;

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
                <Link to={'/product/' + data.id + '/edit'}>
                    <Button type="primary">Update Product</Button>
                </Link>
            ),
        },
    ];
    return listData;
};

export const productTableColumns = [
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
        render: (text, record) => <CustomDataTableCell data={record} type="product" />,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Retail Price',
        dataIndex: 'retailPrice',
        key: 'retailPrice',
        align: 'right',
        render: (retailPrice) => <Text>{$(retailPrice).toFixed()}</Text>,
    },
    {
        title: 'Status',
        dataIndex: 'productstock',
        key: 'productstock',
        render: (productstock) => <ProductStockStatusCard status={productstock.stockStatus} />,
        sorter: (a, b) => a.productstock.stockStatus.localeCompare(b.productstock.stockStatus),
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
        render: (brand) => <Text>{brand.name}</Text>,
        sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
        title: 'Category',
        dataIndex: 'subcategory',
        key: 'subcategory',
        render: (subcategory) => <Text>{subcategory.category.name}</Text>,
        sorter: (a, b) => a.subcategory.category.name.localeCompare(b.subcategory.category.name),
    },
    {
        title: 'Subcategory',
        dataIndex: 'subcategory',
        key: 'subcategory',
        render: (subcategory) => <Text>{subcategory.name}</Text>,
        sorter: (a, b) => a.subcategory.name.localeCompare(b.subcategory.name),
    },
];

export const initialFormValues = {
    notice: '',
};

export const CustomFormMainItems = () => {
    const [attributeValueList, setAttributeValueList] = useState([]);
    const [subcategoryList, setsubcategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [supplierList, setSupplierList] = useState([]);
    const [discountList, setDiscountList] = useState([]);
    const [vatList, setVatList] = useState([]);
    const navigate = useNavigate();
    const formLayout = layoutConfig.form;

    useEffect(() => {
        getAllAttributevalues();
        getAllSubcategories();
        getAllBrands();
        getAllSuppliers();
        getAllDiscountValues();
        getAllVATValues();
    }, []);

    const getAllAttributevalues = async () => {
        let listResult = [];
        const result = await service.getAll('attribute/attribute-values');

        if (result.length > 0) {
            result.sort((a, b) => {
                return a.id - b.id;
            });
            result.map((value) => {
                if (value.attributevalue.length > 0) {
                    let optionElement = {
                        label: value.name,
                        options: [],
                    };

                    value.attributevalue.map((val) => {
                        let opt = { label: val.name, value: val.id, id: val.id };
                        optionElement.options.push(opt);
                    });

                    optionElement.options.sort((a, b) => {
                        return a.value - b.value;
                    });

                    listResult.push(optionElement);
                    setAttributeValueList(listResult);
                }
            });
        }
    };

    const getAllSuppliers = async () => {
        let suppliers = await service.getAll('supplier');
        //console.log('suppliers', suppliers);
        if (suppliers.length > 0) {
            let supList = [];
            suppliers.map((value) => {
                let opt = { label: value.name, value: value.id, id: value.id };
                supList.push(opt);
            });
            setSupplierList(supList);
        }
    };

    const getAllSubcategories = async () => {
        let listResult = [];
        const result = await service.getAll('category/subcategories');
        if (result.length > 0) {
            result.sort((a, b) => {
                return a.id - b.id;
            });
            result.map((value) => {
                if (value.subcategory.length > 0) {
                    let optionElement = {
                        label: value.name,
                        options: [],
                    };

                    value.subcategory.map((val) => {
                        let opt = { label: val.name, value: val.id, id: val.id };
                        optionElement.options.push(opt);
                    });

                    optionElement.options.sort((a, b) => {
                        return a.id - b.id;
                    });
                    listResult.push(optionElement);
                    setsubcategoryList(listResult);
                }
            });
        }
    };

    const getAllBrands = async () => {
        const brands = await service.getAll('brand');

        if (brands.length > 0) {
            let brandList = [];
            brands.sort((a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
            brands.map((value) => {
                let opt = { label: value.name, value: value.id, id: value.id };
                brandList.push(opt);
            });

            setBrandList(brandList);
        }
    };

    const getAllDiscountValues = async () => {
        const discountValues = await service.getAll('discount');
        if (discountValues.length > 0) {
            let discountList = [];
            discountValues.map((value) => {
                let opt = { label: value.discountPercent, value: value.id, id: value.id }; //convert to value, key
                opt.label = value.discountPercent + '%';
                /*if (value.discountPercent == 0) {
                    opt.label = 'No Discount';
                } else {
                    opt.label = value.discountPercent + '%';
                }*/
                discountList.push(opt);
            });
            setDiscountList(discountList);
        }
    };

    const getAllVATValues = () => {
        let valueList = [0.07, 0.19];
        let vatList = [];
        valueList.map((element, index) => {
            let opt = { label: element, value: element, id: index };
            opt.label = $(element * 100).toFixed() + '%';
            vatList.push(opt);
        });
        setVatList(vatList);
    };
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

            <Form.Item label="Brand">
                <Input.Group compact>
                    <Form.Item
                        name="brand"
                        label="Brand"
                        hasFeedback
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select placeholder="Please select a brand" style={{ width: '70%' }} options={brandList} />
                    </Form.Item>
                    <Form.Item noStyle>
                        <Button
                            style={{ width: '30%' }}
                            icon={<PlusOutlined />}
                            type={'primary'}
                            onClick={() => {
                                navigate('/brand/add');
                            }}
                        >
                            New Brand
                        </Button>
                    </Form.Item>
                </Input.Group>
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
                    <Form.Item
                        name="listingPrice"
                        noStyle
                        rules={[{ required: true, message: 'Listing Price is required' }]}
                    >
                        <InputNumber
                            style={{ width: '25%' }}
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
                            style={{ width: '25%' }}
                            placeholder="Retail Price"
                            min="0"
                            max="1000000"
                            step="1"
                        />
                    </Form.Item>
                    <Form.Item name="vat" noStyle rules={[{ required: true, message: ' VAT is required' }]}>
                        <Select style={{ width: '25%' }} placeholder="VAT" options={vatList} />
                    </Form.Item>
                    <Form.Item name="discount" noStyle rules={[{ required: true, message: 'Discount' }]}>
                        <Select placeholder="Discount" style={{ width: '25%' }} options={discountList} />
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item label="Attribute">
                <Input.Group compact>
                    <Form.Item
                        name="attributeValue"
                        label="Attribute"
                        hasFeedback
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '70%' }}
                            placeholder="Please select types"
                            options={attributeValueList}
                        />
                    </Form.Item>
                    <Form.Item noStyle>
                        <Button
                            style={{ width: '30%' }}
                            icon={<PlusOutlined />}
                            type={'primary'}
                            onClick={() => {
                                navigate('/attribute-value/add');
                            }}
                        >
                            New Attribute
                        </Button>
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item label="Subcategory">
                <Input.Group compact>
                    <Form.Item
                        name="subcategory"
                        label="Subcategory"
                        hasFeedback
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Please select a subcategory"
                            style={{ width: '65%' }}
                            options={subcategoryList}
                        />
                    </Form.Item>
                    <Form.Item noStyle>
                        <Button
                            style={{ width: '35%' }}
                            icon={<PlusOutlined />}
                            type={'primary'}
                            onClick={() => {
                                navigate('/subcategory/add');
                            }}
                        >
                            New Subcategory
                        </Button>
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item label="Supplier">
                <Input.Group compact>
                    <Form.Item
                        name="supplier"
                        label="Supplier"
                        hasFeedback
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '70%' }}
                            placeholder="Please select supplier(s)"
                            options={supplierList}
                        />
                    </Form.Item>
                    <Form.Item noStyle>
                        <Button
                            style={{ width: '30%' }}
                            icon={<PlusOutlined />}
                            type={'primary'}
                            onClick={() => {
                                navigate('/supplier/add');
                            }}
                        >
                            New Supplier
                        </Button>
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item label="Notice" name="notice">
                <Input.TextArea allowClear showCount placeholder="Notice" />
            </Form.Item>
        </>
    );
};
