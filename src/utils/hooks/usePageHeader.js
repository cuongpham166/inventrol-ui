import React, { useState, useEffect } from 'react';

import * as service from '../../api/services/index';
import { Col, Row, PageHeader as AntPageHeader } from 'antd';

const usePageHeader = ({
    title,
    dataId,
    table,
    extraContent = [],
    mainContent = [],
    pageHeaderTag = [],
    pageHeaderExtra,
}) => {
    const [pageHeaderTitle, setPageHeaderTitle] = useState('');

    useEffect(() => {
        if (dataId != '') {
            let ignore = false;
            const getDataById = async (dataId) => {
                const result = await service.getById(table, dataId);
                let titleValue = result.name;
                if (!ignore) {
                    setPageHeaderTitle(titleValue);
                }
            };
            getDataById(dataId);
            return () => {
                ignore = true;
            };
        } else {
            setPageHeaderTitle(title);
        }
    }, []);

    const Content = ({ children, extra }) => (
        <div
            className="content"
            style={{
                display: 'flex',
            }}
        >
            <div className="main">{children}</div>
            <div className="extra">{extra}</div>
        </div>
    );

    const PageHeader = () => (
        <AntPageHeader
            className="site-page-header-responsive"
            title={pageHeaderTitle}
            tags={pageHeaderTag}
            extra={pageHeaderExtra}
        >
            <Content extra={extraContent}>{mainContent}</Content>
        </AntPageHeader>
    );

    return { PageHeader };
};

export default usePageHeader;
