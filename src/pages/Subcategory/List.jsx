import React, { useState, useEffect } from 'react';

import { Table } from 'antd';

import Topbar from '../../components/Topbar';
import Toolbar from '../../components/Toolbar';
import * as subcategoryService from '../../api/services/Subcategory';
import * as componentProps from '../Subcategory/props';
import ActionMenu from '../../components/ActionMenu';

const SubcategoryList = (props) => {
    const [dataSource, setDataSource] = useState([]);

    const tableColumns = componentProps.tableColumns;
    const topbarProps = componentProps.topbar;
    const toolbarProps = componentProps.toolbar;

    useEffect(() => {
        getAllData();
        getSearchValue();
    }, []);

    const getSearchValue = async (childData) => {
        const searchResult = await subcategoryService.search(childData);
        setDataSource(searchResult);
    };

    const getAllData = async () => {
        const result = await subcategoryService.getAll();
        setDataSource(result);
    };

    return (
        <div style={{ padding: '50px' }}>
            <Topbar topbar={topbarProps} />
            <div style={{ padding: '35px', backgroundColor: 'whitesmoke' }}>
                <Toolbar toolbar={toolbarProps} getSearchValue={getSearchValue} />
                <Table
                    columns={tableColumns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '30'],
                        total: dataSource.totalElements,
                        showTotal: (total, range) => {
                            return `${range[0]}-${range[1]} of ${total} items`;
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default SubcategoryList;
