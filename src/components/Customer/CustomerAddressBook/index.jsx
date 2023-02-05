import React, { useState, useEffect, useRef } from 'react';
import CustomerAddressCard from './CustomerAddressCard';
import { useParams } from 'react-router-dom';
import * as service from '@services';

const CustomerAddressBook = (props) => {
    const [dataSource, setDataSource] = useState([]);
    const dataSourceRef = useRef(dataSource);
    const { id } = useParams();
    const dataId = parseInt(id);
    const getAllAddressByCustomerId = async (dataId) => {
        let result = await service.getAll('customer/' + dataId + '/address');
        let addresses = result.customeradress;
        addresses.sort((a, b) => Number(b.primary) - Number(a.primary));
        dataSourceRef.current = addresses;
        setDataSource(addresses);
    };

    useEffect(() => {
        getAllAddressByCustomerId(dataId);
    }, []);
    return (
        <>
            {dataSourceRef.current.map((address, index) => {
                return <CustomerAddressCard data={address} key={index} />;
            })}
        </>
    );
};

export default CustomerAddressBook;
