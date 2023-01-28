import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import CustomDataTable from 'components/common/CustomDataTable';

import * as service from '../../../api/services';

const DetailBrandModal = ({ isModalOpen, handleModalOk, handleModalCancel, dataID }) => {
    const getDetailBrand = async (dataID) => {
        try {
            const result = await service.getById('brand', dataID);
            console.log('Result', result);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getDetailBrand(dataID);
    }, []);

    return (
        <>
            <Modal title={dataID} open={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel} width={1200}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default DetailBrandModal;
