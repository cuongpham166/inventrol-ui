import React from 'react';
import { Card, Timeline } from 'antd';

import PurchaseHistoryItem from './PurchaseHistoryItem';
const PurchaseHistory = (props) => {
    let purchaseHistory = props.data;
    let defaultStatus = ['Purchase made', 'Shipped', 'Delivered', 'Checking', 'Completed'];
    let purchaseStatus = [];
    if (purchaseHistory != undefined) {
        purchaseHistory.sort((a, b) => {
            return a.id - b.id;
        });
        if (purchaseHistory.length < defaultStatus.length) {
            let unfinishedStatus = [];
            let tmpArr = defaultStatus.slice(purchaseHistory.length);
            tmpArr.map((val, index) => {
                let ele = { status: val, createdOn: undefined };
                unfinishedStatus.push(ele);
            });
            purchaseStatus = [...purchaseHistory, ...unfinishedStatus];
        }
    }
    return (
        <Card title="History" bordered={false}>
            <Timeline>
                {purchaseStatus.map((status, index) => {
                    return <PurchaseHistoryItem data={status} key={index} />;
                })}
            </Timeline>
        </Card>
    );
};

export default PurchaseHistory;
