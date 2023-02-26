import React, { useState, useEffect, useRef, useContext } from 'react';

import { POReportDataContext } from '..';

import poreportMainStyles from './style';

import { Text, View } from '@react-pdf/renderer';

const POReportMainCost = (props) => {
    const { poreportData, setPoreportData } = useContext(POReportDataContext);
    return (
        <>
            {poreportData != undefined && poreportData.purchaseSummary != undefined ? (
                <View style={poreportMainStyles.purchaseCostContainer}>
                    <Text style={poreportMainStyles.purchaseCostText}>Total: {poreportData.purchaseSummary.total}</Text>
                </View>
            ) : (
                <></>
            )}
        </>
    );
};

export default POReportMainCost;
