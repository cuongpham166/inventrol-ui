import React, { useState, useEffect } from 'react';
import { Button, Modal, Typography, Badge, Table } from 'antd';

import PurchaseShippingCard from 'components/Purchase/PurchaseCard/PurchaseShippingCard';
import DateTimeFormatter from 'components/common/CustomFormatter/DateTimeFormatter';
import SupplierPurchaseItemModal from './SupplierPurchaseItemModal';

import * as service from '../../../../api/services';

const { Text } = Typography;

const purchaseTableColumns = [
    {
        title: 'ID',
        key: 'index',
        render: (text, record, index) => <Text strong>#{record.id}</Text>,
    },
    {
        title: 'Status',
        dataIndex: 'purchaseshipping',
        key: 'purchaseshipping',
        render: (purchaseshipping) => <PurchaseShippingCard status={purchaseshipping.status} />,
        sorter: (a, b) => a.purchaseshipping.status.localeCompare(b.purchaseshipping.status),
    },
    {
        title: 'Payment',
        dataIndex: 'paymentType',
        key: 'paymentType',
    },
    {
        title: 'Items',
        dataIndex: 'numberOfItems',
        key: 'numberOfItems',
        align: 'right',
    },
    {
        title: 'Total Cost',
        dataIndex: 'total',
        key: 'total',
        align: 'right',
    },
    {
        title: 'Purchased on',
        dataIndex: 'createdOn',
        align: 'right',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
        sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
    },
    {
        title: 'Items',
        dataIndex: 'name',
        key: 'action',
        width: '50px',
        align: 'center',
        render: (text, record) => <SupplierPurchaseItemModal dataID={record.id} />,
    },
];

const SupplierPurchaseModal = ({ isViewPurchaseModalOpen, handleViewPurchaseModalOk, dataID }) => {
    const DEFAULT_PAGE_SIZE = 10;
    const DEFAULT_PAGE_NUMBER = 0;
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const [dataSource, setDataSource] = useState(null);
    const [itemDataSource, setItemDataSource] = useState(null);

    const getPurchaseBySupplier = async (dataID) => {
        try {
            const result = await service.getAll('supplier/' + dataID + '/purchases');
            if (result != undefined) {
                result.sort((a, b) => {
                    return a.id - b.id;
                });
                setDataSource(result);
                setItemDataSource(result.purchaseItem);
            } else {
                setDataSource([]);
                setItemDataSource([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPurchaseBySupplier(dataID);
    }, []);

    return (
        <>
            <Modal
                title="Purchase List"
                open={isViewPurchaseModalOpen}
                onOk={handleViewPurchaseModalOk}
                okText={'Close'}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={false}
                width={1200}
            >
                <Table
                    columns={purchaseTableColumns}
                    dataSource={dataSource}
                    rowKey="id"
                    bordered
                    pagination={{
                        pageSize: DEFAULT_PAGE_SIZE,
                        current: currentPage + 1,

                        showTotal: (total, range) => {
                            return `${range[0]}-${range[1]} of ${total} items`;
                        },
                    }}
                />
            </Modal>
        </>
    );
};

export default SupplierPurchaseModal;
