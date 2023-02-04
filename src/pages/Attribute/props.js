import React, { useState, useEffect } from 'react';
import { Popover, Tag, Form, Input } from 'antd';

import DateTimeFormatter from 'components/common/CustomFormatter/DateTimeFormatter';

import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';

export const initialFormValues = {
    notice: '',
    attributevalue: [],
};

export const attributeTableColumns = [
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
        render: (text, record) => <CustomDataTableCell data={record} type="attribute" />,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
        title: 'Created on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        align: 'right',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
    },
];

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

            <Form.Item label="Notice" name="notice">
                <Input.TextArea allowClear showCount placeholder="Notice" />
            </Form.Item>
        </>
    );
};
