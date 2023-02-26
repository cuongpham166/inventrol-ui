import React from 'react';

import { View } from '@react-pdf/renderer';

import POReportFooterInfo from './POReportFooterInfo';
import POReportFooterLogo from './POReportFooterLogo';

import poreportFooterStyles from './style';

const POReportFooter = (props) => {
    return (
        <View style={poreportFooterStyles.footerContainer}>
            <POReportFooterLogo />
            <POReportFooterInfo />
        </View>
    );
};

export default POReportFooter;
