import React from 'react';
import { CodeSandboxOutlined, TagOutlined } from '@ant-design/icons';
import useStatisticCard from 'utils/hooks/useStatisticCard';

const statisticCardData = [
    {
        icon: <TagOutlined />,
        title: '5',
        key: '1',
        text: "Today's Purchases",
        percentage: '-2',
    },
    {
        icon: <CodeSandboxOutlined />,
        title: '10',
        key: '2',
        text: 'New Products',
        percentage: '+3',
    },
    {
        icon: <TagOutlined />,
        title: '6',
        key: '3',
        text: 'Total Purchase',
        percentage: '+9',
    },
    {
        icon: <CodeSandboxOutlined />,
        title: '9',
        key: '4',
        text: 'Total Product',
        percentage: '+3',
    },
];

const SupplierDatatStatistics = (props) => {
    const { StatisticCard } = useStatisticCard({ data: statisticCardData });
    return (
        <>
            <StatisticCard />
        </>
    );
};

export default SupplierDatatStatistics;
