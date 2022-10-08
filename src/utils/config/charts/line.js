export const multiLine = {
    xField: 'date',
    yField: 'number',
    seriesField: 'type',
    yAxis: {
        label: {},
    },
    legend: {
        position: 'top',
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
        appear: {
            animation: 'path-in',
            duration: 7000,
        },
    },
};
