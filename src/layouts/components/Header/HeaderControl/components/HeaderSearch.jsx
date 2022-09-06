import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Select, AutoComplete, Space } from 'antd';
import debounce from 'lodash/debounce';

import * as service from '@services';

const { Option } = Select;

const HeaderSearch = (props) => {
    const navigate = useNavigate();
    const [selectValue, setSelectValue] = useState('subcategory');
    const [autocompletePlaceholder, setAutocompletePlaceholder] = useState('Search ' + selectValue);
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [autocompleteValue, setAutocompleteValue] = useState('');

    const renderOptionItem = (title, value) => ({
        label: title,
        value: value,
    });

    const renderAutocompleteOptionItem = (key, title) => ({
        key: key,
        label: title,
        value: title,
    });

    const selectOptions = [renderOptionItem('Subcategory', 'subcategory'), renderOptionItem('Category', 'category')];

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
        <Space size={2}>
            <Select
                defaultValue={selectValue}
                style={{
                    width: 120,
                }}
                onChange={handleChange}
                options={selectOptions}
            ></Select>
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
        </Space>
    );
};

export default HeaderSearch;
