import React from 'react';
import { Row, Col, Input } from 'antd';

const { Search } = Input;
const onSearch = (value) => console.log(value);
const Toolbar = (props) => {
    const searchPlaceholder = props.toolbarData.searchPlaceholder;
    return (
        <div style={{ marginBottom: '20px' }}>
            <Row justify="space-between">
                <Col span={5}>
                    <Search placeholder={searchPlaceholder} onSearch={onSearch} enterButton />
                </Col>
                <Col span={12}>
                    <Row></Row>
                </Col>
            </Row>
        </div>
    );
};

export default Toolbar;
