import React, { useMemo } from 'react';
import { Col, Row, Button, Card, Space, Typography, Tag } from 'antd';
import { ArrowCircleUp, AdProduct, CircleRightDown, ArrowCircleDown } from '@icon-park/react';
import SummaryCardItem from './SummaryCardItem';
import _ from 'lodash';
const { Text, Title } = Typography;

const InventorySummaryCard = ({ totalProducts, stockData }) => {
    let inventoryList = [];
    let totalProductItem = {
        color: 'purple',
        icon: <AdProduct theme="filled" className="dashboard_icon--small" />,
        text: 'Total Products',
        number: totalProducts,
    };
    inventoryList.push(totalProductItem);

    const copiedStockData = useMemo(() => {
        const copiedStockData = stockData.slice();
        return copiedStockData;
    }, [stockData]);

    let stockDataList = [];
    copiedStockData.map((val, idx) => {
        stockDataList.push(val.productstock.stockStatus);
    });

    let stockCountList = _.values(_.groupBy(stockDataList)).map((d) => ({ name: d[0], count: d.length }));

    stockCountList.map((value, index) => {
        let intentoryListElemet;
        if (value.name == 'Out of Stock') {
            intentoryListElemet = {
                color: 'error',
                icon: <ArrowCircleDown theme="filled" className="dashboard_icon--small" />,
                text: value.name,
                number: value.count,
            };
        } else if (value.name == 'In Stock') {
            intentoryListElemet = {
                color: 'success',
                icon: <ArrowCircleUp theme="filled" className="dashboard_icon--small" />,
                text: value.name,
                number: value.count,
            };
        } else {
            intentoryListElemet = {
                color: 'warning',
                icon: <CircleRightDown theme="filled" className="dashboard_icon--small" />,
                text: value.name,
                number: value.count,
            };
        }
        inventoryList.push(intentoryListElemet);
    });

    return (
        <Card bordered={false} title="Inventory Summary">
            {inventoryList.map((value, index) => {
                return (
                    <SummaryCardItem
                        key={index}
                        color={value.color}
                        icon={value.icon}
                        text={value.text}
                        number={value.number}
                    />
                );
            })}
        </Card>
    );
};

export default InventorySummaryCard;
