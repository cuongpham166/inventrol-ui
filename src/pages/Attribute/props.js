import React, { useState, useEffect } from 'react';
import { Popover, Tag, Form, Input, Select, Card, Typography, Button, Tooltip } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';
import { EyeOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import * as service from '../../api/services';
import * as layoutConfig from 'utils/config/layout';

import NoticeModal from 'components/ModalTable/NoticeModal';
import DateTimeFormatter from 'components/common/DateTimeFormatter';
import AttributeValueModal from 'components/ModalTable/AttributeValueModal';

const { Option } = Select;
const { Title } = Typography;
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
        dataIndex: 'createdOn',
        key: 'createdOn',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
    },
    {
        title: 'Created by',
        dataIndex: 'createdBy',
        key: 'createdBy',
    },
    {
        title: 'Updated on',
        dataIndex: 'updatedOn',
        key: 'updatedOn',
        render: (updatedOn) => <DateTimeFormatter data={updatedOn} />,
    },
    {
        title: 'Updated by',
        dataIndex: 'updatedBy',
        key: 'updatedBy',
    },
    {
        title: () => <Tooltip title="Attribute Value">AttrVal.</Tooltip>,
        dataIndex: 'attributevalue',
        key: 'attributevalue',
        align: 'center',
        width: '50px',
        render: (attributevalue) => <AttributeValueModal data={attributevalue} />,
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
        width: '50px',
        align: 'center',
        render: (notice) => <NoticeModal data={notice} />,
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
