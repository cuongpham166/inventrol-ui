import { Select, Form, Input } from 'antd';
const { Option } = Select;

export const getExportFileSettings = (dataTypeRef) => {
    let settings = {};
    switch (dataTypeRef.current) {
        case 'pdf':
            settings = {
                unit: 'pt',
                pageSize: 'A4',
                fontSize: 15,
                orientation: 'portrait',
                fileName: 'report',
                reportName: 'My Report',
            };
            break;
        case 'csv':
            settings = {
                fileName: 'report',
            };
            break;
        case 'json':
            settings = {
                fileName: 'report',
            };
            break;
        default:
            break;
    }
    return settings;
};

export const getExportFormItems = (dataTypeRef) => {
    let items;
    switch (dataTypeRef.current) {
        case 'pdf':
            const range = (size, startAt = 0) => {
                return [...Array(size).keys()].map((i) => i + startAt);
            };
            const fontSizes = range(7, 9);
            items = (
                <>
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
                </>
            );
            break;
        case 'csv':
            items = (
                <>
                    <Form.Item name="fileName" label="Filename">
                        <Input />
                    </Form.Item>
                </>
            );
            break;
        case 'json':
            items = (
                <>
                    <Form.Item name="fileName" label="Filename">
                        <Input />
                    </Form.Item>
                </>
            );
            break;
        default:
            items = <></>;
            break;
    }
    return items;
};

const headerFormatter = (type, tableName) => {
    let header = [];
    switch (type) {
        case 'pdf':
            switch (tableName) {
                case 'category':
                    header = ['Index', 'Name', 'Subcategories', 'Created on', 'Updated on', 'Notice'];
                    break;
                default:
                    break;
            }
            break;
        case 'csv':
            switch (tableName) {
                case 'category':
                    header = [['Index', 'Name', 'Subcategories', 'Created on', 'Updated on', 'Notice']];
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    return header;
};

const dataFormatter = (data, dataType, tableName) => {
    let dataList = [];
    switch (tableName) {
        case 'category':
            data.map((value, index) => {
                let item;
                let subcategories = '';
                value.subcategory.map((subcat, idx) => {
                    if (dataType == 'csv') {
                        subcategories = subcategories + ' / ' + subcat.name;
                    } else {
                        subcategories = subcategories + ', ' + subcat.name;
                    }
                });
                item = [index + 1, value.name, subcategories, value.createdDate, value.updatedDate, value.notice];

                dataList.push(item);
            });
            break;
        default:
            break;
    }
    return dataList;
};

export const exportDataFormatter = (data, tableName, dataType) => {
    let exportData = {
        dataList: [],
        dataHeader: [],
    };
    exportData.dataHeader = headerFormatter(dataType, tableName);
    exportData.dataList = dataFormatter(data, dataType, tableName);
    return exportData;
};
