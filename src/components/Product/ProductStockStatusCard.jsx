import React from 'react';
import { Tag } from 'antd';
const ProductStockStatusCard = (props) => {
    let tagColor;
    switch (props.status) {
        case 'Out of Stock':
            tagColor = 'error';
            break;
        case 'In Stock':
            tagColor = 'success';
            break;
        case 'Low in Stock':
            tagColor = 'warning';
            break;
        default:
            tagColor = 'default';
            break;
    }
    return <Tag color={tagColor}>{props.status}</Tag>;
};

export default ProductStockStatusCard;
