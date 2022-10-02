import { Tooltip, Popover, Button } from 'antd';
import {
    PhoneOutlined,
    ShopOutlined,
    UserOutlined,
    MailOutlined,
    HomeOutlined,
    EnvironmentOutlined,
    FormOutlined,
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
                    <Button type="primary">Show Notice</Button>
                </Popover>
            ),
        },
    ];
    return listData;
};

export const initialFormValues = {
    website: '',
    phone_number: '',
    mobile_number: '',
    additional_address_line: '',
    notice: '',
};
