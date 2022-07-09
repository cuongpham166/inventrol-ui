import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Search } = Input;
const useToolbar = ({ table }) => {
    const [searchValue, setSearchValue] = useState('');
    const onSearch = (value) => {
        setSearchValue(value);
    };

    const Toolbar = () => (
        <div style={{ marginBottom: '20px' }}>
            <Row justify="space-between">
                <Col span={5}>
                    <Search placeholder={'Search ' + table} onSearch={onSearch} enterButton />
                </Col>
                <Col span={12}>
                    <Row style={{ float: 'right' }}>
                        <Link to={'/' + table + '/add'}>
                            <Button type="primary" icon={<PlusOutlined />}>
                                Add New
                            </Button>
                        </Link>
                    </Row>
                </Col>
            </Row>
        </div>
    );

    return { searchValue, Toolbar };
};

export default useToolbar;
