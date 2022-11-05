import React, { useState } from 'react';
import { Button, Modal, List, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ExpandAltOutlined } from '@ant-design/icons';
const { Text } = Typography;
const SupplierModal = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    let listData = [
        {
            title: 'Name',
            text: <Link to={'/supplier/' + data.id}>{data.name}</Link>,
        },
        {
            title: 'Contact Person',
            text: data.contactPerson,
        },
        {
            title: 'Email',
            text: <a href={data.email}>Send Email</a>,
        },
        {
            title: 'Phone Numer',
            text: data.contact.phoneNumber,
        },
        {
            title: 'Mobile Number',
            text: data.contact.mobileNumber,
        },
        {
            title: 'Address',
            text: data.contact.mainAddressLine,
        },
        {
            title: 'Address Line 2',
            text: data.contact.additionalAddressLine,
        },
        {
            title: 'City',
            text: data.contact.cityInfo,
        },
        {
            title: 'Country',
            text: data.contact.country,
        },
    ];
    return (
        <>
            <Button onClick={showModal} icon={<ExpandAltOutlined />}></Button>
            <Modal
                title="Detailed Information"
                open={isModalOpen}
                onOk={handleOk}
                okText={'Close'}
                closable={false}
                centered={true}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <List
                    dataSource={listData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta title={item.title} key={index} />
                            <Text>{item.text}</Text>
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
};

export default SupplierModal;
