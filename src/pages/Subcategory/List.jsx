import React from 'react';

import Topbar from '../../components/Topbar';
import * as componentProps from '../Subcategory/props';
import useDataTable from '../../utils/hooks/useDataTable';

const SubcategoryList = (props) => {
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: componentProps.tableColumns,
        table: 'subcategory',
    });

    const topbarProps = componentProps.topbar.list;

    return (
        <div style={{ padding: '50px' }}>
            <Topbar topbar={topbarProps} />
            <div style={{ padding: '35px', backgroundColor: 'whitesmoke' }}>
                <Toolbar />
                <DataTable />
            </div>
        </div>
    );
};

export default SubcategoryList;
