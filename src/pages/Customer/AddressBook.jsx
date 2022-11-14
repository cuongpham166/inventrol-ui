import React, { useState, useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import Breadcrumb from 'components/Breadcrumb';
import AddressList from 'components/Customer/AddressList';
import usePageHeader from 'utils/hooks/usePageHeader';

const AddressBook = (props) => {
    const { PageHeader } = usePageHeader({
        title: 'Address Book',
        dataId: '',
        table: '',
        pageHeaderExtra: <></>,
    });

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            <Row>
                <PageHeader />
            </Row>

            <Row gutter={[16, 16]}>
                <AddressList />
            </Row>
        </>
    );
};

export default AddressBook;
