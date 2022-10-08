import { Tooltip, Popover, Button, Descriptions } from 'antd';
import { Link } from 'react-router-dom';
import {
    PhoneOutlined,
    ShopOutlined,
    UserOutlined,
    MailOutlined,
    HomeOutlined,
    EnvironmentOutlined,
    FormOutlined,
    EyeOutlined,
    EditOutlined,
} from '@ant-design/icons';

export const supplierDataList = (data) => {
    let address;
    if (data.contact.additionalAddressLine == '') {
        address = data.contact.mainAddressLine;
    } else {
        address = data.contact.mainAddressLine + ', ' + data.contact.additionalAddressLine;
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
                    <ShopOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.name,
        },
        {
            title: (
                <Tooltip placement="top" title={'Contact Person'} color="#7A3DB8">
                    <UserOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.contactPerson,
        },
        {
            title: (
                <Tooltip placement="top" title={'Phone Number'} color="#7A3DB8">
                    <PhoneOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.contact.phoneNumber,
        },

        {
            title: (
                <Tooltip placement="top" title={'Mobile Number'} color="#7A3DB8">
                    <PhoneOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.contact.mobileNumber,
        },

        {
            title: (
                <Tooltip placement="top" title={'Email'} color="#7A3DB8">
                    <MailOutlined className="list_icon" />
                </Tooltip>
            ),
            text: <a href={data.contact.email}>Send Email</a>,
        },
        {
            title: (
                <Tooltip placement="top" title={'Website'} color="#7A3DB8">
                    <HomeOutlined className="list_icon" />
                </Tooltip>
            ),
            text: <a href={data.contact.website}>Visit Homepage</a>,
        },

        {
            title: (
                <Tooltip placement="top" title={'Address'} color="#7A3DB8">
                    <EnvironmentOutlined className="list_icon" />
                </Tooltip>
            ),
            text: address + ', ' + data.contact.cityInfo + ', ' + data.contact.country,
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
                <Tooltip placement="top" title={'Update Supplier'} color="#7A3DB8">
                    <EditOutlined className="list_icon" />
                </Tooltip>
            ),
            text: (
                <Link to={'/supplier/' + data.id + '/edit'}>
                    <Button type="primary">Update Supplier</Button>
                </Link>
            ),
        },
    ];
    return listData;
};

export const supplierPageHeader = (data) => {
    let pageHeaderObj = {};
    let popoverContent = (
        <div>
            <p>{data.notice}</p>
        </div>
    );
    let supplierAddress;
    if (data.contact.additionalAddressLine == '') {
        supplierAddress = data.contact.mainAddressLine;
    } else {
        supplierAddress = data.contact.mainAddressLine + ', ' + data.contact.additionalAddressLine;
    }
    let mainContent = (
        <Descriptions size="small" column={3}>
            <Descriptions.Item label="Contact Person">{data.contactPerson}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">{data.contact.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Mobile Number">{data.contact.mobileNumber}</Descriptions.Item>
            <Descriptions.Item label="Homepage">
                <a href={data.contact.website}>Visit Homepage</a>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
                <a href={data.contact.email}>Send Email</a>
            </Descriptions.Item>
            <Descriptions.Item label="Address">
                {supplierAddress + ', ' + data.contact.cityInfo + ', ' + data.contact.country}
            </Descriptions.Item>
            <Descriptions.Item label="Created on">{data.createdDate}</Descriptions.Item>
            <Descriptions.Item label="Notice">
                <Popover content={popoverContent} title="Notice">
                    <EyeOutlined />
                </Popover>
            </Descriptions.Item>
        </Descriptions>
    );

    let pageHeaderExtra = (
        <>
            <Link to={'/supplier/' + data.id + '/edit'}>
                <Button key="1" type="primary" icon={<EditOutlined />}>
                    Update Supplier
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
export const initialFormValues = {
    website: '',
    phone_number: '',
    mobile_number: '',
    additional_address_line: '',
    notice: '',
};
