import React, { useState, useEffect, useRef, createContext } from 'react';

import {
    ReactPDF,
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    pdf,
    BlobProvider,
    usePDF,
    PDFDownloadLink,
} from '@react-pdf/renderer';
import { Button, Modal, Space, Input, Typography } from 'antd';

import POReportHeader from './POReportHeader';
import POReportFooter from './POReportFooter';
import POReportMain from './POReportMain';

import poreportStyles from './style';

export const POReportDataContext = createContext();

const PdfExportDocument = () => (
    <Document>
        <Page style={poreportStyles.body}>
            <POReportHeader />
            <POReportMain />
            <POReportFooter />
        </Page>
    </Document>
);

const POReportTemplate = (props) => {
    const [poreportData, setPoreportData] = useState();

    useEffect(() => {
        setPoreportData(props.exportData);
    }, [props.exportData]);

    return (
        <div>
            <PDFDownloadLink
                document={
                    <POReportDataContext.Provider
                        value={{ poreportData: poreportData, setPoreportData: setPoreportData }}
                    >
                        <PdfExportDocument />
                    </POReportDataContext.Provider>
                }
                fileName={`${props.filename}.pdf`}
            >
                {({ blob, loading, url }) => {
                    return loading ? 'Loading...' : <Button type="primary">Export</Button>;
                }}
            </PDFDownloadLink>
        </div>
    );
};

export default POReportTemplate;
