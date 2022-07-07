import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
                    <Row style={{ float: 'right' }}>
                        <Link to={'/subcategory/add'}>
                            <Button type="primary" icon={<PlusOutlined />}>
                                Add New
                            </Button>
                        </Link>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Toolbar;
