import React, { useState, useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';
import CustomerAddressBook from 'components/Customer/CustomerAddressBook';

const AddressBook = (props) => {
    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>

            <Row gutter={[16, 16]}>
                <CustomerAddressBook />
            </Row>
        </>
    );
};

export default AddressBook;
