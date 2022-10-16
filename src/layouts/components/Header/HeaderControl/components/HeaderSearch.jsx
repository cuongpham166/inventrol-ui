import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Select, AutoComplete, Space } from 'antd';
import debounce from 'lodash/debounce';

import * as service from '@services';
import * as headerProps from '../components/props';

const { Option } = Select;

const HeaderSearch = (props) => {
    const navigate = useNavigate();
    const [selectValue, setSelectValue] = useState('subcategory');
    const [autocompletePlaceholder, setAutocompletePlaceholder] = useState('Search ' + selectValue);
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [autocompleteValue, setAutocompleteValue] = useState('');

    const renderAutocompleteOptionItem = (key, title) => ({
        key: key,
        label: title,
        value: title,
    });

    const handleChange = (value) => {
        setSelectValue(value);
        setAutocompletePlaceholder('Search ' + value);
    };

    const handleSearch = (value) => {
        setAutocompleteValue(value);
    };

    const handleSelect = (value, option) => {
        navigate('/' + selectValue + '/' + option.key);
    };

    useEffect(() => {
        if (autocompleteValue !== '') {
            getSearchResult(selectValue, autocompleteValue);
        } else {
            setAutocompleteOptions([]);
        }
    }, [autocompleteValue]);

    const getSearchResult = async (table, text) => {
        const result = await service.search(table, text);
        let tempArr = [];
        result.map((result, index) => {
            tempArr.push(renderAutocompleteOptionItem(result.id, result.name));
        });
        setAutocompleteOptions(tempArr);
    };

    return (
        <div className="header_searchbar_container">
            <span className="header_searchbar_select" style={{ marginRight: '5px' }}>
                <Select
                    defaultValue={selectValue}
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                    options={headerProps.selectSearchOptions}
                ></Select>
            </span>
            <span className="header_searchbar_input">
                <AutoComplete
                    style={{
                        width: 200,
                    }}
                    allowClear={true}
                    onSearch={debounce(handleSearch, 400)}
                    onSelect={handleSelect}
                    options={autocompleteOptions}
                    placeholder={autocompletePlaceholder}
                    notFoundContent
                />
            </span>
        </div>
    );
};

export default HeaderSearch;
