import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';

import * as service from '../../api/services';
const { Option } = Select;

export const initialFormValues = {
    notice: '',
};

export const CustomFormMainItems = () => {
    const [categoryDataSource, setCategpryDataSource] = useState([]);
    const [blockPickerColor, setBlockPickerColor] = useState('#37d67a');

    const onChangeColor = (color) => {
        setBlockPickerColor(color.hex);
    };
    useEffect(() => {
        getAllCategories();
    }, []);
    const getAllCategories = async () => {
        const result = await service.getAll('category');
        setCategpryDataSource(result);
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
                name="category"
                label="Category"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select placeholder="Please select a category">
                    {categoryDataSource.map((option) => (
                        <Option key={option.id} value={'' + option.id}>
                            {option.name}
                        </Option>
                    ))}
                </Select>
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
        </>
    );
};
