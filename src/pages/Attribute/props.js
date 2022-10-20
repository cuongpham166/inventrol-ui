import React, { useState, useEffect } from 'react';
import { Popover, Tag, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';
import { EyeOutlined } from '@ant-design/icons';
import * as service from '../../api/services';
const { Option } = Select;

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
        title: 'Attribute Values',
        dataIndex: 'attributevalue',
        key: 'attributevalue',
        render: (attributevalue) => (
            <div>
                {attributevalue.map((val) => {
                    return (
                        <Link to={'/attribute-value/' + val.id} key={val.name}>
                            <Tag key={val.id} color="default">
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

export const CustomFormMainItems = () => {
    const [blockPickerColor, setBlockPickerColor] = useState('#7a3db8');
    const [attributeValueList, setAttributeValueList] = useState([]);

    const onChangeColor = (color) => {
        setBlockPickerColor(color.hex);
    };

    useEffect(() => {
        getAllAttributevalues();
    }, []);

    const getAllAttributevalues = async () => {
        let listResult = [];
        const result = await service.getAll('attribute-value');
        result.map((val, idx) => {
            listResult.push(
                <Option key={val.id} value={val.name}>
                    {val.name}
                </Option>,
            );
        });
        setAttributeValueList(listResult);
    };

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
            <Form.Item
                name="attributevalue"
                label="Attribute Value"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    mode="multiple"
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    placeholder="Please select"
                >
                    {attributeValueList}
                </Select>
            </Form.Item>
            <Form.Item label="Notice" name="notice">
                <Input.TextArea allowClear showCount placeholder="Notice" />
            </Form.Item>
        </>
    );
};
