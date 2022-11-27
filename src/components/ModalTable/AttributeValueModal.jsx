import React, { useState } from 'react';
import { Popover, Tag, Button, Modal, Table } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, ExpandAltOutlined } from '@ant-design/icons';
import DateTimeFormatter from 'components/common/DateTimeFormatter';
import NoticeModal from 'components/ModalTable/NoticeModal';
const attributeValueTableColumns = [
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
        render: (text, record) => <Link to={'/attribute-value/' + record.id}>{text}</Link>,
    },
    {
        title: 'Created on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
    },
    {
        title: 'Created by',
        dataIndex: 'createdBy',
        key: 'createdBy',
    },
    {
        title: 'Updated on',
        dataIndex: 'updatedOn',
        key: 'updatedOn',

        render: (updatedOn) => <DateTimeFormatter data={updatedOn} />,
    },
    {
        title: 'Updated by',
        dataIndex: 'updatedBy',
        key: 'updatedBy',
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
        width: '50px',
        align: 'center',
        render: (notice) => <NoticeModal data={notice} />,
    },
];

const AttributeValueModal = ({ data }) => {
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
                title="Attribute Value List"
                open={isModalOpen}
                onOk={handleOk}
                okText={'Close'}
                width={1000}
                closable={false}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Table dataSource={tableData} columns={attributeValueTableColumns} rowKey="id" />
            </Modal>
        </>
    );
};

export default AttributeValueModal;
