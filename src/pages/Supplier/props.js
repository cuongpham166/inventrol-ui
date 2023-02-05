import { Tooltip, Popover, Button, Descriptions, Form, Input, Select, Card, Typography, Space } from 'antd';
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

import SupplierActionMenu from 'components/Supplier/SupplierActionMenu';
import PurchaseShippingCard from 'components/Purchase/PurchaseCard/PurchaseShippingCard';
import PurchaseActionMenu from 'components/Purchase/PurchaseActionMenu';
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
    {
        title: 'Actions',
        dataIndex: 'name',
        key: 'action',
        width: '50px',
        align: 'center',
        render: (text, record) => <SupplierActionMenu id={record.id} />,
    },
];

export const supplierPurchaseTableColumns = [
    {
        title: 'ID',
        key: 'index',
        render: (text, record, index) => <Text strong>#{record.id}</Text>,
    },
    {
        title: 'Status',
        dataIndex: 'purchaseshipping',
        key: 'purchaseshipping',
        render: (purchaseshipping) => <PurchaseShippingCard status={purchaseshipping.status} />,
        sorter: (a, b) => a.purchaseshipping.status.localeCompare(b.purchaseshipping.status),
    },
    {
        title: 'Payment',
        dataIndex: 'paymentType',
        key: 'paymentType',
    },
    {
        title: 'Items',
        dataIndex: 'numberOfItems',
        key: 'numberOfItems',
        align: 'right',
    },
    {
        title: 'Total Cost',
        dataIndex: 'total',
        key: 'total',
        align: 'right',
    },
    {
        title: 'Purchased on',
        dataIndex: 'createdOn',
        align: 'right',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
        sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
    },
    {
        title: 'Actions',
        dataIndex: 'name',
        key: 'action',
        width: '50px',
        align: 'center',
        render: (text, record, index) => <PurchaseActionMenu id={record.id} />,
    },
];

const countryOptions = [
    { label: 'Germany', value: 'Germany' },
    { label: 'Vietnam', value: 'Vietnam' },
];

export const CustomFormMainItems = () => {
    const formLayout = layoutConfig.form;
    return (
        <>
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

            <Form.Item label="Email" name="email" hasFeedback>
                <Input placeholder={'Email'} />
            </Form.Item>

            <Form.Item label="Phone Number">
                <Input.Group compact>
                    <Form.Item name="phoneNumber" noStyle hasFeedback>
                        <Input placeholder="Phone Number" style={{ width: '50%' }} />
                    </Form.Item>
                    <Form.Item name="mobileNumber" noStyle hasFeedback>
                        <Input placeholder="Mobile Number" style={{ width: '50%' }} />
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item label="Main Address">
                <Space direction="vertical">
                    <Input.Group compact>
                        <Form.Item
                            name="streetName"
                            noStyle
                            rules={[{ required: true, message: ' Street Name is required' }]}
                        >
                            <Input style={{ width: '70%' }} placeholder="Street Name" />
                        </Form.Item>
                        <Form.Item
                            name="streetNumber"
                            noStyle
                            rules={[{ required: true, message: 'Street Number is required' }]}
                        >
                            <Input style={{ width: '30%' }} placeholder="Street Number" />
                        </Form.Item>
                    </Input.Group>
                    <Input.Group compact>
                        <Form.Item
                            name="postcode"
                            label="Postcode"
                            hasFeedback
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Postcode" style={{ width: '20%' }} />
                        </Form.Item>
                        <Form.Item
                            name="city"
                            label="City"
                            hasFeedback
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="City" style={{ width: '40%' }} />
                        </Form.Item>
                        <Form.Item
                            name="country"
                            label="Country"
                            hasFeedback
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                style={{ width: '40%' }}
                                placeholder="Please select country"
                                options={countryOptions}
                            />
                        </Form.Item>
                    </Input.Group>
                </Space>
            </Form.Item>
            <Form.Item label="Additional Address Line" name="additionalAddressLine">
                <Input placeholder="Additional Address Line" />
            </Form.Item>

            <Form.Item label="Notice" name="notice">
                <Input.TextArea allowClear showCount placeholder={'Notice'} />
            </Form.Item>
        </>
    );
};
