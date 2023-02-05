import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';

const SupplierEmailModal = ({ isEmailModalOpen, handleEmailModalOk, dataID }) => {
    return (
        <>
            <Modal
                title="Send Email"
                open={isEmailModalOpen}
                onOk={handleEmailModalOk}
                okText={'Close'}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={false}
            ></Modal>
        </>
    );
};

export default SupplierEmailModal;
