import React, { useState, useRef } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Space, Col, Input, Row, Checkbox, Popover, Button } from 'antd';

const CheckBoxMenu = (props) => {
    const [selectedValues, setSelectedValues] = useState(props.value);
    const onChange = (value) => {
        setSelectedValues(value);
        return props.onChange(value);
    };

    const checboxGroupRender = () => {
        return (
            <div style={{ width: '150px', padding: '5px' }}>
                <Row gutter={[24, 24]}>
                    <Checkbox.Group value={selectedValues} onChange={onChange}>
                        <Row>
                            {props.options.map((value, index) => {
                                return (
                                    <Col span={24} key={index}>
                                        <Checkbox value={value} key={index}>
                                            {value}
                                        </Checkbox>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Checkbox.Group>
                </Row>
            </div>
        );
    };

    const CheckboxGroupRender = checboxGroupRender;
    return (
        <>
            <Popover placement="bottom" content={<CheckboxGroupRender />} title={'Columns'} trigger="click">
                <Button icon={<FilterOutlined />}>Columns</Button>
            </Popover>
        </>
    );
};

export default CheckBoxMenu;
