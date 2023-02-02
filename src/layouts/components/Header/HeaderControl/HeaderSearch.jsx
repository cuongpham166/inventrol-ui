import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Select, AutoComplete, Space, Input } from 'antd';
import debounce from 'lodash/debounce';

import * as service from '@services';
import * as headerProps from './props';

import meilisearchCient from 'utils/config/search/meilisearch';
import searchOptions from 'utils/config/search/searchoptions';

const { Option } = Select;

const HeaderSearch = (props) => {
    const [options, setOptions] = useState([]);
    const [selectOption, setSelectOptions] = useState(searchOptions[0].value);
    const handleSearch = (value) => {
        console.log('search value', value);
    };
    const onSelect = (value) => {
        console.log('onSelect', value);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <Space.Compact block>
            <Select
                defaultValue={selectOption}
                style={{ width: 120 }}
                onChange={handleChange}
                options={searchOptions}
            />
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{
                    width: 300,
                }}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
            >
                <Input.Search size="middle" placeholder="Inventrol Search" enterButton />
            </AutoComplete>
        </Space.Compact>
    );
};

export default HeaderSearch;
