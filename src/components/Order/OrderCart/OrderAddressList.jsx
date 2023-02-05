import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as service from '@services';
import {
    Table,
    Card,
    Tag,
    Tabs,
    Typography,
    Space,
    Button,
    Select,
    Row,
    Col,
    Form,
    Input,
    Radio,
    Checkbox,
} from 'antd';
import NewOrderAddressModalForm from '../OrderModal/OrderAddressModalForm/NewOrderAddressModalForm';
import EditOrderAddressModalForm from '../OrderModal/OrderAddressModalForm/EditOrderAddressModalForm';

const { Text, Title } = Typography;
const { TextArea } = Input;
const OrderAddressList = (props) => {
    const [shippingAddValue, setShippingAddValue] = useState();
    const [billingAddValue, setBillingAddValue] = useState();
    const [isBillingAddSame, setIsBillingAddSame] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const dataSourceRef = useRef(dataSource);
    const { id } = useParams();
    const customerId = parseInt(id);

    const getAllAddressByCustomerId = async (customerId) => {
        let result = await service.getAll('customer/' + customerId + '/address');
        let addresses = result.customeradress;
        addresses.sort((a, b) => Number(b.primary) - Number(a.primary));
        dataSourceRef.current = addresses;
        setDataSource(addresses);
        setShippingAddValue(addresses[0].id);
    };

    const handleChangeShippingAddress = (e) => {
        setShippingAddValue(e.target.value);
    };

    const handleChangeBillingAddress = (e) => {
        setBillingAddValue(e.target.value);
    };

    const handleChangeNotice = (e) => {
        console.log('Change:', e.target.value);
    };

    const handleToggleBillingAddress = (e) => {
        setIsBillingAddSame(!isBillingAddSame);
    };

    useEffect(() => {
        getAllAddressByCustomerId(customerId);
    }, []);
    return (
        <div className="order_address_list">
            <div className="order_address_section">
                <Title level={5} style={{ marginTop: '0' }}>
                    Choose a Shipping Address
                </Title>
                <Radio.Group onChange={handleChangeShippingAddress} value={shippingAddValue}>
                    {dataSource.map((data, i) => {
                        return (
                            <Radio value={data.id} key={i} style={{ marginBottom: '15px' }}>
                                <Space>
                                    {data.primary == true ? (
                                        <Tag color="#7a3db8" style={{ marginRight: '0px' }}>
                                            Primary
                                        </Tag>
                                    ) : (
                                        <></>
                                    )}
                                    <Text>
                                        {data.streetName} {data.streetNumber},
                                    </Text>
                                    {data.additionalAddressLine == '' ? (
                                        <></>
                                    ) : (
                                        <Text>{data.additionalAddressLine},</Text>
                                    )}
                                    <Text>
                                        {data.postcode} {data.city},
                                    </Text>
                                    <Text>{data.country}</Text>
                                    <EditOrderAddressModalForm
                                        customerId={customerId}
                                        addressId={data.id}
                                        setDataSource={setDataSource}
                                        dataSource={dataSource}
                                    />
                                </Space>
                            </Radio>
                        );
                    })}
                </Radio.Group>
            </div>
            <div className="order_address_section">
                <Title level={5}>Choose a Billing Address</Title>
                <Checkbox
                    style={{ marginBottom: '15px' }}
                    checked={isBillingAddSame}
                    onChange={handleToggleBillingAddress}
                >
                    Same as Shipping Address
                </Checkbox>

                {isBillingAddSame == true ? (
                    <></>
                ) : (
                    <Radio.Group onChange={handleChangeBillingAddress} value={billingAddValue}>
                        {dataSource.map((data, i) => {
                            return (
                                <Radio value={data.id} key={i} style={{ marginBottom: '20px' }}>
                                    <Space>
                                        <Text>
                                            {data.streetName} {data.streetNumber},
                                        </Text>
                                        {data.additionalAddressLine == '' ? (
                                            <></>
                                        ) : (
                                            <Text>{data.additionalAddressLine},</Text>
                                        )}
                                        <Text>
                                            {data.postcode} {data.city},
                                        </Text>
                                        <Text>{data.country}</Text>
                                        <EditOrderAddressModalForm
                                            customerId={customerId}
                                            addressId={data.id}
                                            setDataSource={setDataSource}
                                            dataSource={dataSource}
                                        />
                                    </Space>
                                </Radio>
                            );
                        })}
                    </Radio.Group>
                )}
            </div>
            <div className="order_address_section">
                <Title level={5}>Order Notice</Title>
                <TextArea
                    rows={4}
                    placeholder="Order Notice"
                    showCount
                    defaultValue={''}
                    onChange={handleChangeNotice}
                />
            </div>
            <NewOrderAddressModalForm customerId={customerId} setDataSource={setDataSource} />
        </div>
    );
};

export default OrderAddressList;
