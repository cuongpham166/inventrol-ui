import React from 'react';

import POReportHeaderTitle from './POReportHeaderTitle';
import POReportHeaderSubtitle from './POReportHeaderSubtitle';

const POReportHeader = (props) => {
    return (
        <div>
            <POReportHeaderTitle />
            <POReportHeaderSubtitle />
        </div>
    );
};

export default POReportHeader;
