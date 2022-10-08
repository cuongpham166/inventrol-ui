import { Tooltip, Popover, Button, Tag, Space } from 'antd';
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
    ];
    return listData;
};
