import { Tooltip, Popover, Button, Tag, Space, Descriptions, Statistic } from 'antd';
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
} from '@ant-design/icons';

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
