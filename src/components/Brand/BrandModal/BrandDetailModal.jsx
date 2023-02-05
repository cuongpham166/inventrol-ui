import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';

import CustomModalDataTable from 'components/common/CustomModalDataTable';

import * as service from '../../../api/services';
import * as brandProps from '../../../pages/Brand/props';

const BrandDetailModal = ({ isViewModalOpen, handleViewModalOk, dataID }) => {
    const [dataSource, setDataSource] = useState(null);
    const [modalTile, setModalTitle] = useState('');
    const [tableDataSource, setTableDataSource] = useState([]);
    const getDetailBrand = async (dataID) => {
        try {
            const result = await service.getById('brand', dataID);
            setDataSource(result);
            setModalTitle(result.name);
            setTableDataSource(result.product);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getDetailBrand(dataID);
    }, []);

    return (
        <>
            <Modal
                title={modalTile}
                open={isViewModalOpen}
                onOk={handleViewModalOk}
                okText={'Close'}
                width={1200}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={false}
            >
                <CustomModalDataTable dataSource={tableDataSource} columns={brandProps.brandProductTableColumns} />
            </Modal>
        </>
    );
};

export default BrandDetailModal;
