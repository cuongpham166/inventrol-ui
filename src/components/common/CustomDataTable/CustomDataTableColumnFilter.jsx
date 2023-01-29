import React, { useState, useRef } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Space, Col, Input, Row, Checkbox, Popover, Button } from 'antd';

const CustomerDataTableColumnFilter = (props) => {
    const onChange = (value) => {
        return props.onChange(value);
    };

    const checboxGroupRender = () => {
        return (
            <div style={{ width: '150px', padding: '5px' }}>
                <Row gutter={[24, 24]}>
                    <Checkbox.Group defaultValue={props.value} onChange={onChange}>
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
                <Button icon={<FilterOutlined />}>Filter Columns</Button>
            </Popover>
        </>
    );
};

export default CustomerDataTableColumnFilter;
