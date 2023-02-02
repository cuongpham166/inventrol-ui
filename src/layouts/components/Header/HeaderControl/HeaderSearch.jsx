import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Select, AutoComplete, Space, Input } from 'antd';
import debounce from 'lodash/debounce';

import searchOptions from 'utils/config/search/searchoptions';

import * as searchService from '../../../../api/services/Search';

const { Option } = Select;

const HeaderSearch = (props) => {
    const [autocompletOptions, setautocompletOptions] = useState([]);
    const [selectedOption, setSelectedOptions] = useState(searchOptions[0].value);

    const navigate = useNavigate();

    const searchResult = (query) => {
        let optionArr = [];
        query.map((val, idx) => {
            let ele = { key: val.id, value: val.name };
            optionArr.push(ele);
        });
        return optionArr;
    };

    const handleSelectResult = (value, element) => {
        let table = selectedOption;
        let elementId = element.key;
        navigate(`/${table}/${elementId}`);
    };

    const handleChangeSelect = (value) => {
        setSelectedOptions(value);
    };

    const handleSearch = async (value) => {
        try {
            let result = await searchService.searchRecordByText(selectedOption, value);
            setautocompletOptions(result.hits ? searchResult(result.hits) : []);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Space.Compact block>
            <Select
                defaultValue={searchOptions[0].value}
                style={{ width: 120 }}
                onChange={handleChangeSelect}
                options={searchOptions}
            />
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{
                    width: 300,
                }}
                options={autocompletOptions}
                onSelect={handleSelectResult}
                onSearch={debounce(handleSearch, 250)}
                filterOption={false}
            >
                <Input.Search size="middle" placeholder="Inventrol Search" enterButton />
            </AutoComplete>
        </Space.Compact>
    );
};

export default HeaderSearch;
