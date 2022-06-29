import React, { useState, useEffect } from 'react';

import Topbar from '../components/Topbar';
import Toolbar from '../components/Toolbar';
import { Table } from 'antd';

import * as subcategoryService from '../api/services/Subcategory';

const SubcategoryPage = (props) => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        getAllData();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Notice',
            dataIndex: 'notice',
            key: 'notice',
        },
        {
            title: 'Updated Date',
            dataIndex: 'updatedDate',
            key: 'updatedDate',
        },
        {
            title: 'Updated Time',
            dataIndex: 'updatedTime',
            key: 'updatedTime',
        },
        {
            title: 'isDeleted',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
        },
    ];

    const toolbarData = {
        title: 'List of Subcategories',
        subtitle: 'Product Managment',
        buttonText: 'Create Subcategory',
    };

    const getAllData = async () => {
        const result = await subcategoryService.getAll();
        setDataSource(result);
    };

    return (
        <div style={{ padding: '50px' }}>
            <Topbar toolbarData={toolbarData} />
            <div style={{ padding: '35px', backgroundColor: 'whitesmoke' }}>
                <Toolbar />
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '30'],
                    }}
                />
            </div>
        </div>
    );
};

export default SubcategoryPage;
