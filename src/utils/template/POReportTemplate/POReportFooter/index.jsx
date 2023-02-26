import React from 'react';

import POReportFooterInfo from './POReportFooterInfo';
import POReportFooterLogo from './POReportFooterLogo';

const POReportFooter = (props) => {
    return (
        <div>
            <POReportFooterLogo />
            <POReportFooterInfo />
        </div>
    );
};

export default POReportFooter;
