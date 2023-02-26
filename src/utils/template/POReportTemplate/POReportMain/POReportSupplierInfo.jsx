import React, { useState, useEffect, useRef, useContext } from 'react';

import { POReportDataContext } from '..';

import poreportMainStyles from './style';

import { Text, View } from '@react-pdf/renderer';

/*poreportData.supplier = {
    "name": "Cuong Pham",
    "id": 1,
    "email": "phamhungcuong@mail.de",
    "contact": {
        "address": "Scharnhorststraße. 2, 47059 Duisburg, Germany",
        "country": "Germany",
        "additionalAddressLine": "1.Stock",
        "mobileNumber": "",
        "city": "Duisburg",
        "postcode": "47059",
        "streetName": "Scharnhorststraße",
        "streetNumber": "2",
        "phoneNumber": ""
    },
    "contactPerson": "Khanh Pham",
    "website": ""
}*/
const POReportSupplierInfo = (props) => {
    const { poreportData, setPoreportData } = useContext(POReportDataContext);

    /*if (poreportData != undefined && poreportData.supplier != undefined) {
        console.log('poreportData', poreportData.supplier);
        console.log('poreportData', poreportData.supplier.contact);
    }*/

    return (
        <>
            {poreportData != undefined && poreportData.supplier != undefined ? (
                <View style={poreportMainStyles.infosection}>
                    <Text style={poreportMainStyles.maininfoTitle}>Supplier</Text>
                    <Text style={poreportMainStyles.mainInfoText}>{poreportData.supplier.name}</Text>
                    <Text style={poreportMainStyles.mainInfoText}>
                        {poreportData.supplier.contact.streetName} {poreportData.supplier.contact.streetNumber}
                    </Text>
                    {poreportData.supplier.contact.additionalAddressLine != '' ? (
                        <Text style={poreportMainStyles.mainInfoText}>
                            {poreportData.supplier.contact.additionalAddressLine}
                        </Text>
                    ) : (
                        <></>
                    )}
                    <Text style={poreportMainStyles.mainInfoText}>
                        {poreportData.supplier.contact.postcode} {poreportData.supplier.contact.city}
                    </Text>
                </View>
            ) : (
                <></>
            )}
        </>
    );
};

export default POReportSupplierInfo;
