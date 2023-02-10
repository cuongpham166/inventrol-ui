export const basicColumn = {
    xField: 'type',
    yField: 'sales',
    label: {
        position: 'middle',
        // 'top', 'bottom', 'middle',
        style: {
            width: '100%',
            fill: '#FFFFFF',
            opacity: 0.6,
        },
    },
    xAxis: {
        label: {
            autoHide: true,
            autoRotate: false,
        },
    },
    meta: {
        type: {
            alias: '类别',
        },
        sales: {
            alias: 'sales',
        },
    },
};

export const groupedColumns = {
    isGroup: true,
    xField: 'date',
    yField: 'number',
    seriesField: 'type',
    label: {
        position: 'middle',
        layout: [
            {
                type: 'interval-adjust-position',
            },
            {
                type: 'interval-hide-overlap',
            },
            {
                type: 'adjust-color',
            },
        ],
    },
};
