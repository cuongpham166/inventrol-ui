import React from 'react';

import { View } from '@react-pdf/renderer';

import POReportHeaderTitle from './POReportHeaderTitle';
import POReportHeaderSubtitle from './POReportHeaderSubtitle';

import poreportHeaderStyles from './style';

const POReportHeader = (props) => {
    return (
        <View style={poreportHeaderStyles.headerContainer}>
            <POReportHeaderTitle />
            <POReportHeaderSubtitle />
        </View>
    );
};

export default POReportHeader;
