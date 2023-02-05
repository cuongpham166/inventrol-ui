import React, { useState, useEffect, useRef } from 'react';
import { Popover, Tag, Button, Modal, Table, Form, Input, Checkbox, message } from 'antd';
import OrderAddressModalForm from './OrderAddressModalForm';

import * as layoutConfig from '../../../../utils/config/layout';
import * as service from '../../../../api/services/index';
const NewOrderAddressModalForm = (props) => {
    message.config(layoutConfig.message);
    const [isModalOpen, setIsModalOpen] = useState(false);
    /*const [initialFormValues, setInitialFormValues] = useState({ notice: '', additionalAddressLine: '' });
    const [form] = Form.useForm();*/
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleSave = async (values) => {
        let data = {
            customerId: props.customerId,
            newData: values,
        };
        let res = await service.create('customer-address', data);
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

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const refreshAddressData = async () => {
        let result = await service.getAll('customer/' + props.customerId + '/address');
        let addresses = result.customeradress;
        addresses.sort((a, b) => Number(b.primary) - Number(a.primary));
        return props.setDataSource(addresses);
    };

    return (
        <>
            <Button onClick={showModal} type="primary">
                Add New Address
            </Button>
            <OrderAddressModalForm
                open={isModalOpen}
                onCancel={handleCancel}
                onSave={handleSave}
                //initialFormValues={initialFormValues}
                formTitle="Add New Address"
                formType="Create"
            />
        </>
    );
};

export default NewOrderAddressModalForm;
