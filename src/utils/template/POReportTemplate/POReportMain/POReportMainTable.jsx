import React, { useState, useEffect, useRef, useContext } from 'react';

import { POReportDataContext } from '..';

import { Table, TableHeader, TableCell, DataTableCell, TableBody } from '@david.kucsai/react-pdf-table';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    textNumber: {
        fontSize: 11,
        textAlign: 'right',
    },
    text: {
        fontSize: 11,
        textAlign: 'left',
    },
});

const POReportMainTable = (props) => {
    const { poreportData, setPoreportData } = useContext(POReportDataContext);

    console.log('poreportData', poreportData);

    return (
        <>
            {poreportData != undefined ? (
                <Table data={poreportData.items}>
                    <TableHeader>
                        <TableCell style={styles.text}>#</TableCell>
                        <TableCell style={styles.text}>Item Name</TableCell>
                        <TableCell style={styles.textNumber}>Qty</TableCell>
                        <TableCell style={styles.textNumber}>U/C</TableCell>
                        <TableCell style={styles.textNumber}>Total</TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell getContent={(r) => r.code} style={styles.text} />
                        <DataTableCell getContent={(r) => r.name} style={styles.text} />
                        <DataTableCell getContent={(r) => r.quantity} style={styles.textNumber} />
                        <DataTableCell getContent={(r) => r.unitCost} style={styles.textNumber} />
                        <DataTableCell getContent={(r) => r.totalCost} style={styles.textNumber} />
                    </TableBody>
                </Table>
            ) : (
                <></>
            )}
        </>
    );
};

export default POReportMainTable;
