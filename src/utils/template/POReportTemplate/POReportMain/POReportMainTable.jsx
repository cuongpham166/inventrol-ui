import React, { useState, useEffect, useRef, useContext } from 'react';

import { POReportDataContext } from '..';

import poreportMainStyles from './style';

import { Table, TableHeader, TableCell, DataTableCell, TableBody } from '@david.kucsai/react-pdf-table';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const POReportMainTable = (props) => {
    const { poreportData, setPoreportData } = useContext(POReportDataContext);

    return (
        <>
            {poreportData != undefined ? (
                <Table data={poreportData.items}>
                    <TableHeader>
                        <TableCell style={poreportMainStyles.tablecellText}>#</TableCell>
                        <TableCell style={poreportMainStyles.tablecellText}>Item Name</TableCell>
                        <TableCell style={poreportMainStyles.tablecellNumber}>Qty</TableCell>
                        <TableCell style={poreportMainStyles.tablecellNumber}>U/C</TableCell>
                        <TableCell style={poreportMainStyles.tablecellNumber}>Total</TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell getContent={(r) => r.code} style={poreportMainStyles.datatablecellText} />
                        <DataTableCell getContent={(r) => r.name} style={poreportMainStyles.datatablecellText} />
                        <DataTableCell getContent={(r) => r.quantity} style={poreportMainStyles.datatablecellNumber} />
                        <DataTableCell getContent={(r) => r.unitCost} style={poreportMainStyles.datatablecellNumber} />
                        <DataTableCell getContent={(r) => r.totalCost} style={poreportMainStyles.datatablecellNumber} />
                    </TableBody>
                </Table>
            ) : (
                <></>
            )}
        </>
    );
};

export default POReportMainTable;
