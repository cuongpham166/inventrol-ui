import { Tooltip } from 'antd';
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
    let address_1 = data.contact.street_name + ' ' + data.contact.street_number;
    let address_2 = data.contact.additional_address_line;
    let city = data.contact.postcode + ' ' + data.contact.city;
    let country = data.contact.country;
    let listData = [
        {
            title: (
                <Tooltip placement="top" title={'Name'} color="#7A3DB8">
                    <ShopOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.info.name,
        },
        {
            title: (
                <Tooltip placement="top" title={'Contact Person'} color="#7A3DB8">
                    <UserOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.info.contact_person,
        },
        {
            title: (
                <Tooltip placement="top" title={'Phone Number'} color="#7A3DB8">
                    <PhoneOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.contact.phone_number,
        },

        {
            title: (
                <Tooltip placement="top" title={'Mobile Number'} color="#7A3DB8">
                    <PhoneOutlined className="list_icon" />
                </Tooltip>
            ),
            text: data.contact.mobile_number,
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
            text: <a href={data.contact.website}>Homepage</a>,
        },

        {
            title: (
                <Tooltip placement="top" title={'Address'} color="#7A3DB8">
                    <EnvironmentOutlined className="list_icon" />
                </Tooltip>
            ),
            text: address_1 + ', ' + address_2 + ', ' + city + ', ' + country,
        },
        {
            title: (
                <Tooltip placement="top" title={'Notice'} color="#7A3DB8">
                    <FormOutlined className="list_icon" />
                </Tooltip>
            ),
            text: (
                <Tooltip placement="left" title={data.info.notice}>
                    <span>Show Notice</span>
                </Tooltip>
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
