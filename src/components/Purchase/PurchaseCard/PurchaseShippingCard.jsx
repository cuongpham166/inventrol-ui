import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';

const PurchaseShippingCard = ({ status }) => {
    let tagColor;
    switch (status) {
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
            tagColor = 'error';
            break;
        default:
            tagColor = 'default';
            break;
    }
    return <Tag color={tagColor}>{status}</Tag>;
};

export default PurchaseShippingCard;
