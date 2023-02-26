import React from 'react';

import POReportMainCost from './POReportMainCost';
import POReportMainNotice from './POReportMainNotice';

const POReportMainSummary = (props) => {
    return (
        <div>
            <POReportMainNotice />
            <POReportMainCost />
        </div>
    );
};

export default POReportMainSummary;
