import React from 'react';
import { Card, Descriptions, Typography, Space } from 'antd';
const { Text, Link } = Typography;
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

    let homepage;
    let emailLink;

    website != ''
        ? (homepage = (
              <Link href={website} target="_blank">
                  Visit Homepage
              </Link>
          ))
        : (homepage = (
              <Link href="#" target="_blank" disabled>
                  Visit Homepage
              </Link>
          ));

    email != ''
        ? (emailLink = (
              <Link href={email} target="_blank">
                  Send Email
              </Link>
          ))
        : (emailLink = (
              <Link href="#" target="_blank" disabled>
                  Send Email
              </Link>
          ));

    return (
        <Card title="Supplier" bordered={false}>
            <Descriptions bordered column={4}>
                <Descriptions.Item label="Name" span={2}>
                    {name}
                </Descriptions.Item>
                <Descriptions.Item label="Contact Person" span={2}>
                    {contactPerson}
                </Descriptions.Item>
                <Descriptions.Item label="Phone Number" span={2}>
                    <Space direction="vertical">
                        <Text>{phoneNumber}</Text>
                        <Text>{mobileNumber}</Text>
                    </Space>
                </Descriptions.Item>

                <Descriptions.Item label="Email" span={1}>
                    {emailLink}
                </Descriptions.Item>
                <Descriptions.Item label="Website" span={1}>
                    {homepage}
                </Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>
                    {address}
                </Descriptions.Item>
                <Descriptions.Item label="Additional line" span={2}>
                    {addressNotice}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default PurchaseSupplier;
