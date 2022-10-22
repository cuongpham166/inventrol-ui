import React, { useState, useRef } from 'react';
import { BarcodeOutlined } from '@ant-design/icons';
import { Space, Col, Input, Row, Checkbox, Popover, Button, Form, Select, Modal } from 'antd';

const BarcodeGenerator = (props) => {
    return (
        <>
            <Button icon={<BarcodeOutlined />} type={'primary'}>
                Generate Barcode
            </Button>
        </>
    );
};

export default BarcodeGenerator;
