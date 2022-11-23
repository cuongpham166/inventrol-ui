import React from 'react';
import { Card, Descriptions } from 'antd';
const PurchaseSupplier = (props) => {
    let supplierData = props.data;
    let name, email, address, contactPerson, phoneNumber, addressNotice, mobileNumber, website;
    if (supplierData) {
        name = supplierData.name;
        email = supplierData.email;
        website = supplierData.website;
        contactPerson = supplierData.contactPerson;
        address = supplierData.contact.address;
        phoneNumber = supplierData.contact.phoneNumber;
        mobileNumber = supplierData.contact.mobileNumber;
        addressNotice = supplierData.contact.additionalAddressLine;
    }
    return (
        <Card title="Supplier Details" bordered={false}>
            <Descriptions>
                <Descriptions.Item label="Name">{name}</Descriptions.Item>
                <Descriptions.Item label="Email">{email}</Descriptions.Item>
                <Descriptions.Item label="1.Address">{address}</Descriptions.Item>
                <Descriptions.Item label="Contact Person">{contactPerson}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="2.Address">{addressNotice}</Descriptions.Item>
                <Descriptions.Item label="Mobile Number">{mobileNumber}</Descriptions.Item>
                <Descriptions.Item label="Website">{website}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default PurchaseSupplier;
