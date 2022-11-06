import { Button, Modal, Typography } from 'antd';
import { ExpandAltOutlined, BarcodeOutlined } from '@ant-design/icons';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Html5QrcodeError, Html5QrcodeResult } from 'html5-qrcode/esm/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const { Title } = Typography;

const Scanner = (props) => {
    const barcodeScannerContainer = useRef(undefined);
    const barcodeScanner = useRef(undefined);
    const [result, setResult] = useState(undefined);
    const resultRef = useRef(result);
    //console.log = function () {};

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    //console.log('barcodeScannerContainer', barcodeScannerContainer.current);

    const setBarcodeValueForm = (barcodeValue) => {
        return props.onClick(barcodeValue);
    };

    const onScanSuccess = useCallback((decodedText, result) => {
        console.log(decodedText);
        resultRef.current = decodedText;
        setResult(decodedText);
        setBarcodeValueForm(resultRef.current);
    }, []);

    const onScanerror = (errorMessage, error) => {};

    const openCamera = () => {
        barcodeScanner.current = new Html5QrcodeScanner(
            'qr-reader',
            {
                fps: 10,
                qrbox: 300,
            },
            true,
        );
        barcodeScanner.current.render(onScanSuccess, onScanerror);
        setIsButtonDisabled(true);
    };
    useEffect(() => {}, [barcodeScannerContainer.current]);

    const handleOpenCamera = () => {
        openCamera();
    };

    return (
        <div>
            <Button type="primary" onClick={showModal} icon={<BarcodeOutlined />} style={{}}>
                Scan Barcode
            </Button>
            <Modal
                title="Barcode Scanner"
                open={isModalOpen}
                onOk={handleOk}
                okText={'Close'}
                closable={false}
                centered={true}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Title level={5}>Result: {result || 'No result'}</Title>
                <div id={'qr-reader'} ref={barcodeScannerContainer} style={{ width: '450px', margin: '10px 0' }}></div>
                <Button
                    type="primary"
                    onClick={handleOpenCamera}
                    style={{ textAlign: 'center' }}
                    disabled={isButtonDisabled}
                >
                    Start Barcode Scanner
                </Button>
            </Modal>
        </div>
    );
};

export default Scanner;
