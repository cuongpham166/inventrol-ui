import React, { useMemo } from 'react';
import { Card, Timeline } from 'antd';

import PurchaseHistoryItem from './PurchaseHistoryItem';
const PurchaseHistory = ({ data }) => {
    let defaultStatus = ['Purchase made', 'Shipped', 'Delivered', 'Checking', 'Completed'];
    let purchaseStatus = [];

    const sortedHistory = useMemo(() => {
        const sortedHistory = data.slice();
        sortedHistory.sort((a, b) => a.id - b.id);
        return sortedHistory;
    }, [data]);

    if (sortedHistory.length < defaultStatus.length) {
        let unfinishedStatus = [];
        let tmpArr = defaultStatus.slice(sortedHistory.length);
        tmpArr.map((val, index) => {
            let ele = { status: val, createdOn: undefined };
            unfinishedStatus.push(ele);
        });
        purchaseStatus = [...sortedHistory, ...unfinishedStatus];
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
