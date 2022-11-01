import React, { useState } from 'react';
import { Popover, Tag, Button, Modal, Table } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, ExpandAltOutlined } from '@ant-design/icons';
import DateTimeFormatter from 'components/DateTimeFormatter';

const subcategoryTableColumns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
        width: 60,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={'/subcategory/' + record.id}>{text}</Link>,
    },
    {
        title: 'Color',
        dataIndex: 'tagColor',
        key: 'tagColor',
        align: 'center',
        width: '60px',
        render: (tagColor) => <Tag color={tagColor}>{tagColor}</Tag>,
    },
    {
        title: 'Created on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        width: '140px',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
    },
    {
        title: 'Created by',
        dataIndex: 'createdBy',
        key: 'createdBy',
        width: '120px',
    },
    {
        title: 'Updated on',
        dataIndex: 'updatedOn',
        key: 'updatedOn',
        width: '140px',
        render: (updatedOn) => <DateTimeFormatter data={updatedOn} />,
    },
    {
        title: 'Updated by',
        dataIndex: 'updatedBy',
        key: 'updatedBy',
        width: '130px',
    },
];

const SubcategoryModal = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableData, setTableData] = useState();
    const showModal = () => {
        setTableData(data);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal} icon={<ExpandAltOutlined />}></Button>
            <Modal
                title="Subcategory List"
                open={isModalOpen}
                onOk={handleOk}
                okText={'Close'}
                width={1000}
                closable={false}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Table dataSource={tableData} columns={subcategoryTableColumns} rowKey="id" />
            </Modal>
        </>
    );
};

export default SubcategoryModal;
