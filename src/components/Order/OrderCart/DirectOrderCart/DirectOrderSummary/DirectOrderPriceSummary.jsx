import React, { useState, useEffect, useRef, useContext } from 'react';
import { Row, Card, Divider, Typography } from 'antd';
import { $ } from 'moneysafe';
import { $$, subtractPercent, addPercent } from 'moneysafe/ledger';
import { DirectOrderCartContext } from 'pages/Order/DirectOrder/NewDirectOrder';
const { Text, Title } = Typography;

const DirectOrderPriceSummary = ({ data }) => {
    const { directOrderCartData, setDirectOrderCartData } = useContext(DirectOrderCartContext);

    const subtotalCost = directOrderCartData.reduce(
        (total, item) =>
            total +
            item.quantity *
                $$(
                    $(item.retailPrice),
                    // subtract discount
                    subtractPercent(item.discount.discountPercent),
                ).toNumber(),
        0,
    );

    const totalCostWithDiscount = directOrderCartData.reduce(
        (total, item) =>
            total +
            item.quantity *
                $$(
                    $(item.retailPrice),
                    // subtract discount
                    subtractPercent(item.discount.discountPercent),
                    // add tax
                    addPercent(item.vat),
                ).toNumber(),
        0,
    );

    const totalCostWithoutDiscount = directOrderCartData.reduce(
        (total, item) =>
            total +
            item.quantity *
                $$(
                    $(item.retailPrice),
                    // add tax
                    addPercent(item.vat),
                ).toNumber(),
        0,
    );

    const fixedSubtotalCost = $(subtotalCost).toFixed();

    const fixedTotalCostWithDiscount = $(totalCostWithDiscount).toFixed();
    const fixedTotalCostWithoutDiscount = $(totalCostWithoutDiscount).toFixed();

    const totalVAT = $(fixedTotalCostWithDiscount).minus(fixedSubtotalCost).valueOf();
    const totalDiscount = $(fixedTotalCostWithDiscount).minus(fixedTotalCostWithoutDiscount).valueOf();

    return (
        <>
            <Card bordered={false} style={{ marginBottom: '24px' }}>
                <Row justify="space-between" align="middle" style={{}}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Subtotal
                    </Title>
                    <Title level={5} style={{ marginTop: '0', fontWeight: 'bold' }}>
                        {fixedSubtotalCost}€
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '10px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        VAT
                    </Title>
                    <Title level={5} style={{ marginTop: '0', fontWeight: 'bold' }}>
                        {totalVAT}€
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '10px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Discount
                    </Title>
                    <Title level={5} style={{ marginTop: '0', fontWeight: 'bold' }} type="danger">
                        {totalDiscount}€
                    </Title>
                </Row>
                <Divider style={{ margin: '12px 0 24px 0' }} />
                <Row justify="space-between" align="middle" style={{}}>
                    <Title level={3} style={{ margin: '0', color: '#9660c4' }}>
                        Total
                    </Title>
                    <Title level={3} style={{ margin: '0', fontWeight: 'bolder', color: '#9660c4' }}>
                        {$(fixedTotalCostWithDiscount).valueOf()}€
                    </Title>
                </Row>
            </Card>
        </>
    );
};

export default DirectOrderPriceSummary;
