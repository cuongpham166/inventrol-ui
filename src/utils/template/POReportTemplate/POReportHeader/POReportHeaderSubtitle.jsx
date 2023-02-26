import React, { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';

import { POReportDataContext } from '..';
import poreportHeaderStyles from './style';
import * as dayjs from 'dayjs';

const relativeTime = require('dayjs/plugin/relativeTime');
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const POReportHeaderSubtitle = (props) => {
    const { poreportData, setPoreportData } = useContext(POReportDataContext);
    console.log('poreportData', poreportData);
    return (
        <>
            {poreportData != undefined && poreportData.purchaseInfo != undefined ? (
                <View>
                    <Text style={poreportHeaderStyles.headerSubtitle}>PO No: #{poreportData.purchaseInfo.id}</Text>
                    <Text style={poreportHeaderStyles.headerSubtitle}>
                        Created on: {dayjs(poreportData.purchaseInfo.date).format('DD/MM/YYYY HH:mm')}
                    </Text>
                </View>
            ) : (
                <></>
            )}
        </>
    );
};

export default POReportHeaderSubtitle;
