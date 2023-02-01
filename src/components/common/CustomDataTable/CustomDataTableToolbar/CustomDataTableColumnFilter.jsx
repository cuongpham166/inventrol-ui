import React, { useState, useRef } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Space, Col, Input, Row, Checkbox, Popover, Button, Tooltip } from 'antd';

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
                <Tooltip title="Show/hide columns">
                    <Button icon={<EyeOutlined />}></Button>
                </Tooltip>
            </Popover>
        </>
    );
};

export default CustomerDataTableColumnFilter;
