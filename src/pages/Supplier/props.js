import { Tooltip, Popover, Button, Descriptions, Form, Input, Select, Card, Typography } from 'antd';
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

const { Option } = Select;
const { Title } = Typography;

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
            text: <Link to={'/supplier/' + data.id}>{data.name}</Link>,
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

export const supplierTableColumns = [
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
        render: (text, record) => <Link to={'/supplier/' + record.id}>{text}</Link>,
    },
    {
        title: 'Contact Person',
        dataIndex: 'contactPerson',
        key: 'contactPerson',
    },
    {
        title: 'Created on',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: '120px',
    },
    {
        title: 'Updated on',
        dataIndex: 'updatedDate',
        key: 'updatedDate',
        width: '130px',
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
        width: '50px',
        align: 'center',
        render: (notice) => (
            <Popover content={notice} title="Notice" placement="bottom">
                <EyeOutlined />
            </Popover>
        ),
    },
];

export const CustomFormMainItems = () => {
    return (
        <>
            <Card bordered={false} style={{ marginBottom: '24px' }}>
                <div className="card_header">
                    <Title level={4}>Personal Information</Title>
                </div>
                <div className="card_content">
                    <Form.Item
                        label="Name"
                        name="name"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Name is required',
                            },
                        ]}
                    >
                        <Input placeholder={'Name'} />
                    </Form.Item>
                    <Form.Item
                        label="Contact Person"
                        name="contactPerson"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Contact Person is required',
                            },
                        ]}
                    >
                        <Input placeholder={'Contact Person'} />
                    </Form.Item>
                    <Form.Item label="Website" name="website" hasFeedback>
                        <Input placeholder={'Website'} />
                    </Form.Item>

                    <Form.Item label="Notice" name="notice">
                        <Input.TextArea allowClear showCount placeholder={'Notice'} />
                    </Form.Item>
                </div>
            </Card>
            <Card bordered={false}>
                <div className="card_header">
                    <Title level={4}>Contact Information</Title>
                </div>
                <div className="card_content">
                    <Form.Item label="Phone Number" name="phoneNumber" hasFeedback>
                        <Input placeholder={'Phone Number'} />
                    </Form.Item>
                    <Form.Item label="Mobile Number" name="mobileNumber" hasFeedback>
                        <Input placeholder={'Mobile Number'} />
                    </Form.Item>
                    <Form.Item label="Adress">
                        <Input.Group compact>
                            <Form.Item
                                name="streetName"
                                noStyle
                                rules={[{ required: true, message: ' Street Name is required' }]}
                            >
                                <Input style={{ width: 'calc(70% - 8px)' }} placeholder="Street Name" />
                            </Form.Item>
                            <Form.Item
                                name="streetNumber"
                                noStyle
                                rules={[{ required: true, message: 'Street Number is required' }]}
                            >
                                <Input style={{ width: '30%', marginLeft: '8px' }} placeholder="Street Number" />
                            </Form.Item>
                        </Input.Group>

                        <Form.Item name="additionalAddressLine" noStyle>
                            <Input style={{ width: '100%', marginTop: '8px' }} placeholder="Additional Address Line" />
                        </Form.Item>

                        <Input.Group compact style={{ marginTop: '8px' }}>
                            <Form.Item
                                name="postcode"
                                noStyle
                                rules={[{ required: true, message: 'Postcode is required' }]}
                            >
                                <Input style={{ width: 'calc(20% - 8px)' }} placeholder="Postcode" />
                            </Form.Item>
                            <Form.Item name="city" noStyle rules={[{ required: true, message: 'City is required' }]}>
                                <Input style={{ width: 'calc(40% - 8px)', margin: '0 8px' }} placeholder="City" />
                            </Form.Item>
                            <Form.Item
                                name="country"
                                noStyle
                                rules={[{ required: true, message: 'Country is required' }]}
                            >
                                <Input style={{ width: '40%' }} placeholder="Country" />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                </div>
            </Card>
        </>
    );
};
