import React, { useState, useEffect } from 'react';

import { Form, Input, Popover, Tag, Select, Typography, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';

import { EyeOutlined, SaveOutlined } from '@ant-design/icons';
import * as service from '../../api/services';
import * as layoutConfig from 'utils/config/layout';

const { Option } = Select;
const { Title } = Typography;
export const initialFormValues = {
    notice: '',
    tagColor: '#7a3db8',
    subategory: [],
};

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
                    <Title level={4}>Category Information</Title>
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

export const categoryTableColumns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
        width: 50,
    },

    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={'/category/' + record.id}>{text}</Link>,
    },
    {
        title: 'Subcategories',
        dataIndex: 'subcategory',
        key: 'subcategory',
        render: (subcategory) => (
            <div>
                {subcategory.map((val) => {
                    return (
                        <Link to={'/subcategory/' + val.id} key={val.name}>
                            <Tag key={val.id} color={val.tagColor}>
                                {val.name}
                            </Tag>
                        </Link>
                    );
                })}
            </div>
        ),
    },
    {
        title: 'Color',
        dataIndex: 'tagColor',
        key: 'tagColor',
        align: 'center',
        width: '60px',
        render: (tagColor) => <Tag color={tagColor}>{tagColor}</Tag>,
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
