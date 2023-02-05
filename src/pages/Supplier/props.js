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
    SaveOutlined,
} from '@ant-design/icons';
import * as layoutConfig from 'utils/config/layout';

import DateTimeFormatter from 'components/common/CustomFormatter/DateTimeFormatter';

import PurchasedItemModal from 'components/Purchase/PurchaseModal/PurchaseItemModal';
import DateFormatter from 'components/common/CustomFormatter/DateFormatter';
import PurchaseShippingInfoModal from 'components/Purchase/PurchaseModal/PurchaseShippingModal';

import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';

const { Option } = Select;
const { Title, Text } = Typography;

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

export const initialFormValues = {
    email: '',
    website: '',
    phoneNumber: '',
    mobileNumber: '',
    additionalAddressLine: '',
    notice: '',
};

export const supplierTableColumns = [
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
        render: (text, record) => <CustomDataTableCell data={record} type="supplier" />,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Contact Person',
        dataIndex: 'contactPerson',
        key: 'contactPerson',
        sorter: (a, b) => a.contactPerson.localeCompare(b.contactPerson),
    },
    {
        title: 'Created on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        align: 'right',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
        sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
    },
];

export const supplierPurchaseTableColumns = [
    {
        title: 'ID',
        key: 'index',
        render: (text, record, index) => <Link to={'/purchase/' + record.id}>#{record.id}</Link>,
    },
    {
        title: () => <Tooltip title="Purchased Items">Items</Tooltip>,
        dataIndex: 'index',
        key: 'index',
        width: '50px',
        render: (text, record, index) => <PurchasedItemModal data={record} />,
    },
    {
        title: 'Total Cost (€)',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: 'No. of items',
        dataIndex: 'numberOfItems',
        key: 'numberOfItems',
    },
    {
        title: 'Status',
        dataIndex: 'purchaseshipping',
        key: 'purchaseshipping',
        render: (purchaseshipping) => <Text>{purchaseshipping.status}</Text>,
    },
    {
        title: 'Payment',
        dataIndex: 'paymentType',
        key: 'paymentType',
    },
    {
        title: 'Purchased on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        render: (createdOn) => <DateFormatter data={createdOn} />,
    },
    {
        title: () => <Tooltip title="Shipping Information">Shipping</Tooltip>,
        dataIndex: 'index',
        key: 'index',
        width: '50px',
        align: 'center',
        render: (text, record, index) => <PurchaseShippingInfoModal data={record} />,
    },
];

export const CustomFormMainItems = () => {
    const formLayout = layoutConfig.form;
    return (
        <>
            <Card bordered={false} style={{ marginBottom: '24px' }}>
                <div className="card_header">
                    <Title level={4}>General Information</Title>
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
                    <Form.Item label="Email" name="email" hasFeedback>
                        <Input placeholder={'Email'} />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phoneNumber" hasFeedback>
                        <Input placeholder={'Phone Number'} />
                    </Form.Item>
                    <Form.Item label="Mobile Number" name="mobileNumber" hasFeedback>
                        <Input placeholder={'Mobile Number'} />
                    </Form.Item>
                    <Form.Item label="Address">
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
                    <Form.Item {...formLayout.tailLayout} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} className="form_button">
                            Save
                        </Button>
                    </Form.Item>
                </div>
            </Card>
        </>
    );
};
