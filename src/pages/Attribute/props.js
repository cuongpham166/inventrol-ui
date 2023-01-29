import React, { useState, useEffect } from 'react';
import { Popover, Tag, Form, Input, Select, Card, Typography, Button, Tooltip } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';
import { EyeOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import * as service from '../../api/services';
import * as layoutConfig from 'utils/config/layout';

import DateTimeFormatter from 'components/common/DateTimeFormatter';

import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';
const { Option } = Select;
const { Title, Text } = Typography;
export const initialFormValues = {
    notice: '',
    tagColor: '#7a3db8',
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
    const [blockPickerColor, setBlockPickerColor] = useState('#7a3db8');
    const formLayout = layoutConfig.form;

    const onChangeColor = (color) => {
        setBlockPickerColor(color.hex);
    };

    return (
        <>
            <Card bordered={false} style={{ padding: '0px' }}>
                <div className="card_header">
                    <Title level={4}>Attribute Information</Title>
                </div>
                <div className="card_content">
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
                        label="Tag Color"
                        name="tagColor"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Colorpicker
                            popup
                            blockStyles={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                            }}
                            picker={'SketchPicker'}
                            onChange={onChangeColor}
                            value={blockPickerColor}
                        />
                    </Form.Item>

                    <Form.Item label="Notice" name="notice">
                        <Input.TextArea allowClear showCount placeholder="Notice" />
                    </Form.Item>
                    <Form.Item {...formLayout.tailLayout} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} className="form_button">
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Card>
        </>
    );
};
