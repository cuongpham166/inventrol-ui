import React, { useState, useRef } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Space, Col, Input, Row, Checkbox, Popover, Button } from 'antd';

const useDropdownCheckbox = ({ columnList }) => {
    const checkedColumnsRef = useRef(columnList);
    let checkedColumnsRefValue;
    const onChange = (checkedValues) => {
        /*let values = [...checkedValues];
        checkedColumnsRef.current = values;*/
    };

    const onFilterColumns = () => {
        checkedColumnsRefValue = checkedColumnsRef.current;
    };

    const checboxGroupRender = () => {
        return (
            <div style={{ width: '150px', padding: '5px' }}>
                <Row gutter={[24, 24]}>
                    <Checkbox.Group defaultValue={columnList} onChange={onChange}>
                        <Row>
                            {columnList.map((value, index) => {
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
                <Row gutter={[24, 24]} style={{ marginTop: '10px' }}>
                    <Button onClick={onFilterColumns} icon={<FilterOutlined />} type="primary">
                        Filter
                    </Button>
                </Row>
            </div>
        );
    };

    const CheckboxGroupRender = checboxGroupRender;
    const DropdownCheckbox = () => (
        <>
            <Popover placement="bottom" content={<CheckboxGroupRender />} title={'Columns'} trigger="click">
                <Button icon={<FilterOutlined />}>Columns</Button>
            </Popover>
        </>
    );
    return { DropdownCheckbox };
};

export default useDropdownCheckbox;
