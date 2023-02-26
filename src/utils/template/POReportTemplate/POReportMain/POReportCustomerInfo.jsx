import React from 'react';

import poreportMainStyles from './style';

import { Text, View } from '@react-pdf/renderer';

const POReportCustomerInfo = (props) => {
    return (
        <View style={poreportMainStyles.infosection}>
            <Text style={poreportMainStyles.maininfoTitle}>Ship to</Text>
            <Text style={poreportMainStyles.mainInfoText}>Hung Cuong Pham</Text>
            <Text style={poreportMainStyles.mainInfoText}>Sonnenwall 51</Text>
            <Text style={poreportMainStyles.mainInfoText}>47051 Duisburg</Text>
        </View>
    );
};

export default POReportCustomerInfo;
