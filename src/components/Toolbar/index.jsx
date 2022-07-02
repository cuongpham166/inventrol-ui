import React from 'react';
import { Row, Col, Input } from 'antd';

const { Search } = Input;
const Toolbar = (props) => {
    const searchPlaceholder = props.toolbar.searchPlaceholder;
    const onSearch = (value) => {
        props.getSearchValue(value);
    };
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
