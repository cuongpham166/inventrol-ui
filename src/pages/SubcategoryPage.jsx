import React from 'react';

import Toolbar from '../components/Topbar';

import { Table, Row, Col, Typography, Button, Input } from 'antd';

const { Search } = Input;

const tableColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const tableData = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];

const toolbarData = { title: 'List of Subcategories', subtitle: 'Product Managment', buttonText: 'Create Subcategory' };

const onSearch = (value) => console.log(value);

const SubcategoryPage = (props) => {
    return (
        <div style={{ padding: '50px' }}>
            <Toolbar toolbarData={toolbarData} />
            <div style={{ padding: '35px', backgroundColor: 'whitesmoke' }}>
                <Row justify="space-between">
                    <Col span={5}>
                        <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    </Col>
                    <Col span={12}>
                        <Row></Row>
                    </Col>
                </Row>
                <Table columns={tableColumns} dataSource={tableData} />
            </div>
        </div>
    );
};

export default SubcategoryPage;
