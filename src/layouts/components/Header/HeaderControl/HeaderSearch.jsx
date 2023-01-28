import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Select, AutoComplete, Space, Input } from 'antd';
import debounce from 'lodash/debounce';

import * as service from '@services';
import * as headerProps from './props';

const { Option } = Select;

const HeaderSearch = (props) => {
    const [options, setOptions] = useState([]);
    const handleSearch = (value) => {};
    const onSelect = (value) => {
        console.log('onSelect', value);
    };

    return (
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
    );
};

export default HeaderSearch;
