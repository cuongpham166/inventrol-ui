import React, { useState } from 'react';
import { Input } from 'antd';
import * as searchService from '../../../../api/services/Search';
const { Search } = Input;
const CustomDataTableSearchbar = (props) => {
    const [search, setSearch] = useState(false);
    const onSearch = async (value) => {
        let result = await searchService.searchRecordByText('brand', value);
        return props.onChange(result.hits);
    };
    return <Search placeholder="input search text" onSearch={onSearch} enterButton />;
};

export default CustomDataTableSearchbar;
