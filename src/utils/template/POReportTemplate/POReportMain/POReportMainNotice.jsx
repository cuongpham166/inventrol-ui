import React, { useState, useEffect, useRef, useContext } from 'react';

import { POReportDataContext } from '..';

import poreportMainStyles from './style';

import { Text, View } from '@react-pdf/renderer';

const POReportMainNotice = (props) => {
    const { poreportData, setPoreportData } = useContext(POReportDataContext);
    return (
        <>
            {poreportData != undefined && poreportData.purchaseSummary != undefined ? (
                <View>
                    <View style={poreportMainStyles.purchasePaymentContainer}>
                        <Text style={poreportMainStyles.purchaseNoticeTitle}>Payment Method</Text>
                        <Text style={poreportMainStyles.purchaseNoticeText}>
                            {poreportData.purchaseSummary.payment}
                        </Text>
                    </View>
                    <View style={poreportMainStyles.purchaseNoticeContainer}>
                        <Text style={poreportMainStyles.purchaseNoticeTitle}>Notice</Text>
                        <Text style={poreportMainStyles.purchaseNoticeText}>{poreportData.purchaseSummary.notice}</Text>
                    </View>
                </View>
            ) : (
                <></>
            )}
        </>
    );
};

export default POReportMainNotice;
