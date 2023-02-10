import React from 'react';
import { Modal, Skeleton, Result, Descriptions, Space } from 'antd';
import CustomModalDataTable from 'components/common/CustomModalDataTable';
import * as brandProps from '../../../pages/Brand/props';
import { useGetBrandQuery } from 'features/api/apiSlice';
import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';
import DateTimeFormatter from 'components/common/CustomFormatter/DateTimeFormatter';
const BrandDetailModal = ({ isViewModalOpen, handleViewModalOk, dataID }) => {
    let content;
    const { data: brand, isLoading, isSuccess, isError, error } = useGetBrandQuery(dataID);

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Descriptions bordered>
                    <Descriptions.Item label="Name">
                        <CustomDataTableCell data={brand} type="" />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created on">
                        <DateTimeFormatter data={brand.createdOn} />
                    </Descriptions.Item>
                </Descriptions>
                <CustomModalDataTable dataSource={brand.product} columns={brandProps.brandProductTableColumns} />
            </Space>
        );
    } else if (isError) {
        let errorStatus = `[${error.status}] - ${error.error}`;
        content = <Result status="warning" title={errorStatus} />;
    }

    return (
        <Modal
            title={'Brand Detail'}
            open={isViewModalOpen}
            onOk={handleViewModalOk}
            okText={'Close'}
            width={1200}
            cancelButtonProps={{ style: { display: 'none' } }}
            closable={false}
        >
            {content}
        </Modal>
    );
};

export default BrandDetailModal;
