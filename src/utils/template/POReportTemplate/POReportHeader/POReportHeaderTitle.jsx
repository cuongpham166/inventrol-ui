import React from 'react';

import { Text } from '@react-pdf/renderer';

import poreportHeaderStyles from './style';

const POReportHeaderTitle = (props) => {
    return <Text style={poreportHeaderStyles.headerTitle}>Purchase Order</Text>;
};

export default POReportHeaderTitle;
