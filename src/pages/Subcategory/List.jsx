import React from 'react';
import { Col, Row } from 'antd';

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
        <>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Topbar topbar={topbarProps} />
                </Col>
            </Row>
            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px', marginTop: '10px' }}>
                <Toolbar />
            </Row>

            <Row gutter={[16, 16]}>
                <DataTable />
            </Row>
        </>
    );
};

export default SubcategoryList;
