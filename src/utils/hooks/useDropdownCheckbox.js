import React, { useState, useRef } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Space, Col, Input, Row, Checkbox, Popover, Button } from 'antd';

const useDropdownCheckbox = ({ columnList }) => {
    const [checkedColumns, setCheckedColumns] = useState(columnList);
    const checkedColumnsRef = useRef(checkedColumns);
    const onChange = (checkedValues) => {
        //console.log(checkedValues);
        checkedColumnsRef.current = checkedValues;
        setCheckedColumns(...checkedValues);
        console.log(checkedColumnsRef.current);
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
