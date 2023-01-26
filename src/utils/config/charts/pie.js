import { Pie, G2 } from '@ant-design/plots';
const G = G2.getEngine('canvas');
export const pie = {
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    legend: true,
    radius: 0.8,
    label: {
        type: 'outer',
    },
    interactions: [
        {
            type: 'element-active',
        },
    ],
};
