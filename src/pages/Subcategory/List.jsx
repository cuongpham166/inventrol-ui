import React, { useState, useEffect } from 'react';

import Topbar from '../../components/Topbar';
import Toolbar from '../../components/Toolbar';
import * as subcategoryService from '../../api/services/Subcategory';

import * as componentProps from '../Subcategory/props';

import useDataTable from '../../utils/hooks/useDataTable';

const SubcategoryList = (props) => {
    const [dataSource, setDataSource] = useState([]);
    const { DataTable, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: componentProps.tableColumns,
        dataSource: dataSource,
        updateEntity: 'subcategory',
    });

    const topbarProps = componentProps.topbar.list;
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
                <DataTable />
            </div>
        </div>
    );
};

export default SubcategoryList;
