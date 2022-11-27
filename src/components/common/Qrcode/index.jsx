import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
const QrCode = (props) => {
    return (
        <>
            <QRCodeCanvas id="qrCode" value={props.url} size={props.size} bgColor={'#fff'} level={'H'} />
        </>
    );
};

export default QrCode;
