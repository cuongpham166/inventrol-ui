import React, { useState, useEffect, useRef } from 'react';
import { Popover, Tag, Button, Modal, Table, Form, Input, Checkbox, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import OrderAddressModalForm from './OrderAddressModalForm';
import * as layoutConfig from '../../../utils/config/layout';
import * as service from '../../../api/services/index';
const EditOrderAddressModalFrom = (props) => {
    message.config(layoutConfig.message);
    const [isModalOpen, setIsModalOpen] = useState(false);
    //const [initialFormValues, setInitialFormValues] = useState({ notice: '', additionalAddressLine: '' });
    const showModal = () => {
        /*let foundAddress = props.dataSource.find((element) => element.id == props.addressId);
        let updatedValue = {
            streetName: foundAddress.streetName,
            streetNumber: foundAddress.streetNumber,
            additionalAddressLine: foundAddress.additionalAddressLine,
            postcode: foundAddress.postcode,
            city: foundAddress.city,
            country: foundAddress.country,
            primary: foundAddress.primary,
            notice: foundAddress.notice,
        };
        setInitialFormValues(updatedValue);*/
        setIsModalOpen(true);
    };
    const handleSave = async (values) => {
        let data = {
            customerId: props.customerId,
            addressId: props.addressId,
            updatedData: values,
        };

        let res = await service.update('customer-address', data);
        switch (res.status) {
            case 400:
                message.error(res.message);
                break;
            case 200:
                message.success(res.message);
                refreshAddressData();
                setIsModalOpen(false);
                break;
            default:
                break;
        }
    };

    const refreshAddressData = async () => {
        let result = await service.getAll('customer/' + props.customerId + '/address');
        let addresses = result.customeradress;
        addresses.sort((a, b) => Number(b.primary) - Number(a.primary));
        return props.setDataSource(addresses);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal} type="primary" icon={<EditOutlined />}></Button>
            <OrderAddressModalForm
                open={isModalOpen}
                onCancel={handleCancel}
                onSave={handleSave}
                showModal={showModal}
                //initialFormValues={initialFormValues}
                formTitle="Edit Address"
                formType="Update"
                customerId={props.customerId}
                addressId={props.addressId}
            />
        </>
    );
};

export default EditOrderAddressModalFrom;
