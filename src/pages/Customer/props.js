import { Link } from 'react-router-dom';
import { Form, Input, Select, Space } from 'antd';

import DateTimeFormatter from 'components/common/CustomFormatter/DateTimeFormatter';

import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';

import CustomerActionMenu from 'components/Customer/CustomerActionMenu';

export const customerTableColumns = [
    {
        title: 'Id',
        key: 'index',
        render: (text, record, index) => record.id,
        width: 50,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <CustomDataTableCell data={record} type="customer" />,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Mobile Number',
        dataIndex: 'mobileNumber',
        key: 'mobileNumber',
        align: 'right',
    },
    {
        title: 'Created on',
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
        render: (text, record) => <CustomerActionMenu id={record.id} />,
    },
];

const countryOptions = [
    { label: 'Germany', value: 'Germany' },
    { label: 'Vietnam', value: 'Vietnam' },
];

export const initialFormValues = {
    customerNotice: '',
    additionalAddressLine: '',
    addressNotice: '',
};

export const CustomFormMainItems = () => {
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
            <Form.Item
                label="Email"
                name="email"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Mobile Number" name="mobileNumber">
                <Input placeholder="Mobile Number" />
            </Form.Item>

            <Form.Item label="Customer Notice" name="customerNotice">
                <Input.TextArea allowClear showCount placeholder="Customer Notice" />
            </Form.Item>

            <Form.Item label="Main Address">
                <Space direction="vertical">
                    <Input.Group compact>
                        <Form.Item
                            name="streetName"
                            label="Street Name"
                            hasFeedback
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Street Name" style={{ width: '70%' }} />
                        </Form.Item>
                        <Form.Item
                            name="streetNumber"
                            label="Number"
                            hasFeedback
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Number" style={{ width: '30%' }} />
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

            <Form.Item label="Address Notice" name="addressNotice">
                <Input.TextArea allowClear showCount placeholder="Address Notice" />
            </Form.Item>
        </>
    );
};
