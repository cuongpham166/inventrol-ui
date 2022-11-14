import React, { useState, useEffect, useRef } from 'react';
import AddressCard from './AddressCard';
import { useParams } from 'react-router-dom';
import * as service from '@services';

const AddressList = (props) => {
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
                return <AddressCard data={address} key={index} />;
            })}
        </>
    );
};

export default AddressList;
