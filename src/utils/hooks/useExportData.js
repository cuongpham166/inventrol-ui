import React, { useState, useEffect, useRef } from 'react';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { Space, Button, Dropdown, Menu, Modal, Select, Form, Input } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import { exportItems } from 'utils/config/layout';
import * as categoryProps from 'pages/Category/props';
import * as layoutConfig from '../../utils/config/layout';
const { Option } = Select;

const useExportData = ({ dataSource }) => {
    const [form] = Form.useForm();
    const formLayout = layoutConfig.form;

    const range = (size, startAt = 0) => {
        return [...Array(size).keys()].map((i) => i + startAt);
    };
    const fontSizes = range(7, 9);

    const [exportedData, setExportedData] = useState([]);
    const exportedDataRef = useRef(exportedData);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [pageSettings, setPageSettings] = useState({
        unit: 'pt',
        pageSize: 'A4',
        fontSize: 15,
        orientation: 'portrait',
        fileName: 'report',
        reportName: 'My Report',
    });
    const pageSettingsRef = useRef(pageSettings);

    const handleMenuClick = (e) => {
        let dataType = e.key;
        if (dataType === 'pdf') {
            let data = categoryProps.dataExport(dataSource);
            exportedDataRef.current = data;
            setExportedData(data);
            setModalTitle('Export Data to PDF');
            setIsModalOpen(true);
        }
    };
    const handleExport = (settingValues) => {
        pageSettingsRef.current = settingValues;
        setPageSettings(settingValues);
        setIsModalOpen(false);
        exportPDF(exportedDataRef.current);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value) => {
        console.log('Change Value', value);
    };
    const exportPDF = (exportedData) => {
        const marginLeft = 40;
        const doc = new jsPDF(
            pageSettingsRef.current.orientation,
            pageSettingsRef.current.unit,
            pageSettingsRef.current.pageSize,
        );
        doc.setFontSize(pageSettingsRef.current.fontSize);
        const headers = [['Index', 'Name', 'Subcategories', 'Created on', 'Updated on', 'Notice']];

        let content = {
            startY: 50,
            head: headers,
            body: exportedData,
        };

        doc.text(pageSettingsRef.current.reportName, marginLeft, 40);
        doc.autoTable(content);
        doc.save(pageSettingsRef.current.fileName + '.pdf');
    };

    const menu = <Menu onClick={handleMenuClick} items={exportItems} />;
    const DataExporter = () => (
        <>
            <Dropdown overlay={menu}>
                <Button>
                    <Space>
                        Export
                        <CaretDownOutlined />
                    </Space>
                </Button>
            </Dropdown>
            <Modal
                width={500}
                title={modalTitle}
                open={isModalOpen}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            form.resetFields();
                            handleExport(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
                onCancel={handleCancel}
                okText="Export"
            >
                <Form
                    form={form}
                    layout="horizontal"
                    name="form_in_modal"
                    initialValues={pageSettings}
                    {...formLayout.mainLayout}
                >
                    <Form.Item name="fileName" label="Filename">
                        <Input />
                    </Form.Item>
                    <Form.Item name="reportName" label="Report's name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="orientation" label="Orientation">
                        <Select>
                            <Option value="portrait">Portrait</Option>
                            <Option value="landscape">Landscape</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="pageSize" label="Page Size">
                        <Select>
                            <Option value="A4">A4</Option>
                            <Option value="A3">A3</Option>
                            <Option value="A2">A2</Option>
                            <Option value="A1">A1</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="fontSize" label="Font Size">
                        <Select>
                            {fontSizes.map((value) => (
                                <Option value={value} key={value}>
                                    {value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
    return { DataExporter };
};

export default useExportData;
