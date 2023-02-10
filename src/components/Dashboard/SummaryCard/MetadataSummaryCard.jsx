import React from 'react';
import { Card } from 'antd';
import { HashtagKey, TagOne, Rss, Tag as TagIcon } from '@icon-park/react';
import SummaryCardItem from './SummaryCardItem';
const MetadataSummaryCard = ({ totalBrands, totalCategories, totalSubcategories, totalAttributes }) => {
    let metadataList = [];
    let brandData = {
        color: 'purple',
        icon: <TagOne theme="filled" className="dashboard_icon--small" />,
        text: 'Total Brands',
        number: totalBrands,
    };
    let categoryData = {
        color: 'success',
        icon: <TagIcon theme="filled" className="dashboard_icon--small" />,
        text: 'Total Categories',
        number: totalCategories,
    };
    let subcategoryData = {
        color: 'warning',
        icon: <Rss theme="filled" className="dashboard_icon--small" />,
        text: 'Total Subcategories',
        number: totalSubcategories,
    };
    let attributeData = {
        color: 'error',
        icon: <HashtagKey theme="filled" className="dashboard_icon--small" />,
        text: 'Total Attributes',
        number: totalAttributes,
    };
    metadataList.push(brandData, categoryData, subcategoryData, attributeData);
    return (
        <Card bordered={false} title="Metadata Summary">
            {metadataList.map((value, index) => {
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

export default MetadataSummaryCard;
