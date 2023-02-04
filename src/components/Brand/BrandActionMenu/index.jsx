import React, { useState, useEffect, useRef } from 'react';

import { Table, message, Row, Col, Space, Button, Popconfirm, Dropdown } from 'antd';
import { CaretDownOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import CustomModalEditForm from 'components/common/CustomModalEditForm';
import DetailBrandModal from 'components/Brand/DetailBrandModal';

import * as brandProps from '../../../pages/Brand/props';

const BrandActionMenu = ({ id, table }) => {
    const [isClicked, setIsClicked] = useState(-1);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeletePopconfirmOpen, setIsDeletePopconfirmOpen] = useState(false);

    const handleMenuClick = (e) => {
        if (e.key == 'view') {
            setIsClicked(id);
            setIsViewModalOpen(true);
        }

        if (e.key == 'edit') {
            setIsClicked(id);
            setIsEditModalOpen(true);
        }

        if (e.key == 'delete') {
            setIsClicked(id);
            setIsDeletePopconfirmOpen(true);
        }
    };

    const handleViewModalOk = () => {
        setIsViewModalOpen(false);
    };

    const handleEditModalOk = (values) => {
        console.log('values', values);
        setIsEditModalOpen(false);
    };

    const handleExitModalCancel = () => {
        setIsEditModalOpen(false);
    };

    const handleDeleteElement = (id) => {
        setIsDeletePopconfirmOpen(false);
        console.log('delete element', id);
    };

    const handelPopconfirmCancel = () => {
        setIsDeletePopconfirmOpen(false);
    };

    const items = [
        {
            label: 'View',
            key: 'view',
            icon: <EyeOutlined />,
        },
        {
            label: 'Edit',
            key: 'edit',
            icon: <EditOutlined />,
        },
        {
            label: 'Delete',
            key: 'delete',
            icon: <DeleteOutlined />,
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <Dropdown menu={menuProps} trigger={['click']}>
                <Button type="primary" size={'small'} icon={<CaretDownOutlined />}></Button>
            </Dropdown>
            {id == isClicked ? (
                <>
                    <DetailBrandModal
                        isViewModalOpen={isViewModalOpen}
                        handleViewModalOk={handleViewModalOk}
                        dataID={id}
                    />
                    <CustomModalEditForm
                        isEditModalOpen={isEditModalOpen}
                        handleEditModalOk={handleEditModalOk}
                        handleExitModalCancel={handleExitModalCancel}
                        dataID={id}
                        table={table}
                        CustomFormItems={brandProps.CustomFormMainItems}
                    />
                    <Popconfirm
                        title="Are you sure to delete this element?"
                        open={isDeletePopconfirmOpen}
                        onConfirm={() => {
                            handleDeleteElement(id);
                        }}
                        onCancel={handelPopconfirmCancel}
                        okText="Delete"
                        cancelText="Cancel"
                    ></Popconfirm>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default BrandActionMenu;
