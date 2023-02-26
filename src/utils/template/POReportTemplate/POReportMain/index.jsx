import React from 'react';

import { View } from '@react-pdf/renderer';

import poreportMainStyles from './style';

import POReportSupplierInfo from './POReportSupplierInfo';
import POReportCustomerInfo from './POReportCustomerInfo';
import POReportMainTable from './POReportMainTable';
import POReportMainNotice from './POReportMainNotice';
import POReportMainCost from './POReportMainCost';

const POReportMain = (props) => {
    return (
        <View style={poreportMainStyles.mainSectionContainer}>
            <View style={poreportMainStyles.infosectionContainer}>
                <POReportSupplierInfo />
                <POReportCustomerInfo />
            </View>
            <View>
                <POReportMainTable />
            </View>
            <View style={poreportMainStyles.summarysectionContainer}>
                <POReportMainNotice />
                <POReportMainCost />
            </View>
        </View>
    );
};

export default POReportMain;
