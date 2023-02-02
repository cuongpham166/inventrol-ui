import React from 'react';
import { Table, Button, Tooltip, message } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import * as searchService from '../../../api/services/Search';
import * as service from '../../../api/services';

const SearchSettingTable = (props) => {
    const handleUpdateIndex = async (index) => {
        try {
            let uid = index.uid;
            let data = await service.getAll(uid);
            data.sort((a, b) => {
                return a.id - b.id;
            });
            await searchService.updateDocument(uid, data);
            message.success('Data synchronization is successful');
            return props.onChange();
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        {
            title: '#',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: 60,
        },
        {
            title: 'Primary Key',
            dataIndex: 'primaryKey',
            key: 'primaryKey',
        },
        {
            title: 'UID',
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: '50px',
            align: 'center',
            render: (text, record, index) => (
                <Tooltip title="Sync Data">
                    <Button
                        type="primary"
                        onClick={() => {
                            handleUpdateIndex(record);
                        }}
                        size={'small'}
                        icon={<SyncOutlined />}
                    ></Button>
                </Tooltip>
            ),
        },
    ];
    return <Table dataSource={props.tableDataSource} columns={columns} rowKey="uid" bordered />;
};

export default SearchSettingTable;
