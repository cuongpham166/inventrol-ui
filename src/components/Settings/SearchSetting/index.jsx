import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import * as searchService from '../../../api/services/Search';

import SearchSettingStatistic from './SearchSettingStatistic';
import SearchSettingTable from './SearchSettingTable';

const SearchSetting = (props) => {
    const [tableDataSource, setTableDataSource] = useState([]);
    const [serverStatus, setServerStatus] = useState();
    const [statList, setStatList] = useState([]);
    const [lastUpdate, setLastUpdate] = useState();

    const getAllIndexs = async () => {
        let response = await searchService.getAllIndex();
        setTableDataSource(response.results);
    };

    const getAllStats = async () => {
        let response = await searchService.getAllStats();
        let indexObject = response.indexes;
        let keyList = Object.keys(indexObject);
        let indexArr = [];
        keyList.map((value, index) => {
            let indexEle = indexObject[value];
            indexEle['name'] = value;
            indexArr.push(indexEle);
        });
        setStatList(indexArr);
        setLastUpdate(response.lastUpdate);
    };

    const getHealth = async () => {
        let response = await searchService.getHealth();
        setServerStatus(response.status);
    };

    const updateStats = async () => {
        await getAllStats();
        console.log('updateStats');
    };

    useEffect(() => {
        getAllIndexs();
        getAllStats();
        getHealth();
    }, []);

    useEffect(() => {
        getAllStats();
    }, [tableDataSource]);

    return (
        <Row gutter={[24, 24]}>
            <Col span={17}>
                <SearchSettingTable tableDataSource={tableDataSource} onChange={updateStats} />
            </Col>
            <Col span={7}>
                <SearchSettingStatistic serverStatus={serverStatus} statList={statList} lastUpdate={lastUpdate} />
            </Col>
        </Row>
    );
};

export default SearchSetting;
