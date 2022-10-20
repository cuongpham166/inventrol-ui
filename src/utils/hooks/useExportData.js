import React, { useState, useEffect, useRef } from 'react';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { Space, Button, Dropdown, Menu, Modal, Form } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import { exportItems } from 'utils/config/layout';
import * as layoutConfig from 'utils/config/layout';
import * as dataExporter from 'utils/functions/dataExporter';

const useExportData = ({ dataSource, table }) => {
    const [form] = Form.useForm();
    const formLayout = layoutConfig.form;

    const [exportedData, setExportedData] = useState([]);
    const exportedDataRef = useRef(exportedData);

    const [exportedTableHeader, setExportedTableHeader] = useState([]);
    const exportedTableHeaderRef = useRef(exportedTableHeader);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [pageSettings, setPageSettings] = useState(null);
    const pageSettingsRef = useRef(pageSettings);

    const dataTypeRef = useRef('');

    const handleMenuClick = (e) => {
        let dataType = e.key;
        dataTypeRef.current = dataType;

        let settings = {};
        settings = dataExporter.getExportFileSettings(dataTypeRef);
        pageSettingsRef.current = settings;
        setPageSettings(settings);

        let data = dataExporter.exportDataFormatter(dataSource, table, dataType);

        switch (dataType) {
            case 'pdf':
                exportedDataRef.current = data.dataList;
                setExportedData(data.dataList);

                exportedTableHeaderRef.current = data.dataHeader;
                setExportedTableHeader(data.dataHeader);
                break;
            case 'csv':
                exportedDataRef.current = [...data.dataHeader, ...data.dataList];
                setExportedData(...data.dataHeader, ...data.dataList);
                break;
            case 'json':
                exportedDataRef.current = [dataSource];
                setExportedData([dataSource]);
                break;
            default:
                break;
        }

        setModalTitle('Export Data to ' + dataType.toUpperCase());
        setIsModalOpen(true);
    };

    const menu = <Menu onClick={handleMenuClick} items={exportItems} />;

    const handleExport = (settingValues) => {
        settingValues.fileName = settingValues.fileName
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .trim()
            .replace(/ /g, '_');
        pageSettingsRef.current = settingValues;
        setPageSettings(settingValues);

        switch (dataTypeRef.current) {
            case 'pdf':
                exportPDF(exportedDataRef.current);
                break;
            case 'csv':
                exportCSV(exportedDataRef.current);
                break;
            case 'json':
                exportJSON(exportedDataRef.current);
                break;
            default:
                break;
        }
        setIsModalOpen(false);
    };

    const exportPDF = (exportedData) => {
        const marginLeft = 40;
        const doc = new jsPDF(
            pageSettingsRef.current.orientation,
            pageSettingsRef.current.unit,
            pageSettingsRef.current.pageSize,
        );
        doc.setFontSize(pageSettingsRef.current.fontSize);

        let content = {
            startY: 50,
            head: [exportedTableHeaderRef.current],
            body: exportedData,
        };

        doc.text(pageSettingsRef.current.reportName, marginLeft, 40);
        doc.autoTable(content);
        doc.save(pageSettingsRef.current.fileName + '.pdf');
    };

    const exportCSV = (exportedData) => {
        let csvContent = 'data:text/csv;charset=utf-8,' + exportedData.map((e) => e.join(',')).join('\n');
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', pageSettingsRef.current.fileName + '.csv');
        document.body.appendChild(link);
        link.click();
    };

    const exportJSON = (exportedData) => {
        let jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(exportedData[0]))}`;
        let link = document.createElement('a');
        link.setAttribute('href', jsonString);
        link.setAttribute('download', pageSettingsRef.current.fileName + '.json');
        link.click();
    };

    const renderExportFormItems = (dataTypeRef) => {
        let items = dataExporter.getExportFormItems(dataTypeRef);
        return items;
    };

    const formItems = renderExportFormItems(dataTypeRef);

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
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                okText="Export"
            >
                <Form
                    form={form}
                    layout="horizontal"
                    name="form_in_modal"
                    initialValues={pageSettings}
                    {...formLayout.mainLayout}
                >
                    {formItems}
                </Form>
            </Modal>
        </>
    );
    return { DataExporter };
};

export default useExportData;
