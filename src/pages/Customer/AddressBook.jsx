import React, { useState, useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';
import AddressList from 'components/Customer/AddressList';

const AddressBook = (props) => {
    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>

            <Row gutter={[16, 16]}>
                <AddressList />
            </Row>
        </>
    );
};

export default AddressBook;
