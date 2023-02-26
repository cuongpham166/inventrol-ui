import React from 'react';

import POReportMainInfo from './POReportMainInfo';
import POReportMainTable from './POReportMainTable';
import POReportMainSummary from './POReportMainSummary';
import POReportMainQr from './POReportMainQr';

const POReportMain = (props) => {
    return (
        <>
            <POReportMainInfo />
            <POReportMainTable />
            <POReportMainSummary />
            <POReportMainQr />
        </>
    );
};

export default POReportMain;
