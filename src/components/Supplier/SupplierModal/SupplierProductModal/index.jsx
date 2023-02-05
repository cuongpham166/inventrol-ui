import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Typography } from 'antd';

import * as service from '../../../../api/services';

import CustomModalDataTable from 'components/common/CustomModalDataTable';
import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';
import ProductStockStatusCard from 'components/Product/ProductStockStatusCard';

import { $ } from 'moneysafe';

const { Text } = Typography;

const productTableColumns = [
    {
        title: 'Id',
        key: 'index',
        render: (text, record, index) => record.id,
        width: 60,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <CustomDataTableCell data={record} type="product" />,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Retail Price',
        dataIndex: 'retailPrice',
        key: 'retailPrice',
        align: 'right',
        render: (retailPrice) => <Text>{$(retailPrice).toFixed()}</Text>,
    },
    {
        title: 'Status',
        dataIndex: 'productstock',
        key: 'productstock',
        render: (productstock) => <ProductStockStatusCard status={productstock.stockStatus} />,
        sorter: (a, b) => a.productstock.stockStatus.localeCompare(b.productstock.stockStatus),
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
        render: (brand) => <Text>{brand.name}</Text>,
        sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
        title: 'Category',
        dataIndex: 'subcategory',
        key: 'subcategory',
        render: (subcategory) => <Text>{subcategory.category.name}</Text>,
        sorter: (a, b) => a.subcategory.category.name.localeCompare(b.subcategory.category.name),
    },
    {
        title: 'Subcategory',
        dataIndex: 'subcategory',
        key: 'subcategory',
        render: (subcategory) => <Text>{subcategory.name}</Text>,
        sorter: (a, b) => a.subcategory.name.localeCompare(b.subcategory.name),
    },
];

const SupplierProductModal = ({ isViewProductModalOpen, handleViewProductModalOk, dataID }) => {
    const [dataSource, setDataSource] = useState(null);

    const getProductBySupplier = async (dataID) => {
        try {
            const result = await service.getAll('supplier/' + dataID + '/products');
            if (result != undefined) {
                result.sort((a, b) => {
                    return a.id - b.id;
                });
                setDataSource(result);
            } else {
                setDataSource([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProductBySupplier(dataID);
    }, []);

    return (
        <>
            <Modal
                title="Product List"
                open={isViewProductModalOpen}
                onOk={handleViewProductModalOk}
                okText={'Close'}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={false}
                width={1200}
            >
                <CustomModalDataTable dataSource={dataSource} columns={productTableColumns} />
            </Modal>
        </>
    );
};

export default SupplierProductModal;
