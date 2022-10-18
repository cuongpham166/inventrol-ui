import React, { useState, useEffect } from 'react';

import { Form, Input, Popover, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';

import { EyeOutlined } from '@ant-design/icons';

export const initialFormValues = {
    notice: '',
    tagColor: '#7a3db8',
};

export const CustomFormMainItems = () => {
    const [blockPickerColor, setBlockPickerColor] = useState('#7a3db8');

    const onChangeColor = (color) => {
        setBlockPickerColor(color.hex);
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
            <Form.Item label="Notice" name="notice">
                <Input.TextArea allowClear showCount placeholder="Notice" />
            </Form.Item>
        </>
    );
};

export const categoryTableColumns = [
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
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: '120px',
    },
    {
        title: 'Updated Date',
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

const getItem = (index, name, subcategories, createdDate, updatedDate, notice) => {
    return [index, name, subcategories, createdDate, updatedDate, notice];
};

export const dataExport = (data) => {
    let exportData = [];
    data.map((value, index) => {
        let item;
        let subcategories = '';
        value.subcategory.map((subcat, index) => {
            subcategories = subcategories + ', ' + subcat.name;
        });
        item = getItem(index + 1, value.name, subcategories, value.createdDate, value.updatedDate, value.notice);
        exportData.push(item);
    });

    return exportData;
};
