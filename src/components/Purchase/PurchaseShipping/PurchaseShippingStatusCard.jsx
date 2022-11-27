import React from 'react';
import { Tag } from 'antd';
const PurchaseShippingStatusCard = (props) => {
    let tagColor;
    switch (props.status) {
        case 'Processing':
            tagColor = 'processing';
            break;
        case 'Shipped':
            tagColor = 'geekblue';
            break;
        case 'Delivered':
            tagColor = 'cyan';
            break;
        case 'Checking':
            tagColor = 'lime';
            break;
        case 'Completed':
            tagColor = 'green';
            break;
        case 'Returned':
            tagColor = 'magenta';
            break;
        case 'Cancelled':
            tagColor = 'warning';
            break;
        default:
            tagColor = 'default';
            break;
    }
    return <Tag color={tagColor}>{props.status}</Tag>;
};

export default PurchaseShippingStatusCard;
