import React, { useState } from 'react';
import { Input } from 'antd';
import * as searchService from '../../../../api/services/Search';
const { Search } = Input;
const CustomDataTableSearchbar = (props) => {
    const [search, setSearch] = useState(false);
    const onSearch = async (value) => {
        let result = await searchService.searchRecordByText(props.table, value);
        return props.onChange(result.hits);
    };
    return <Search placeholder="Search Record" onSearch={onSearch} enterButton />;
};

export default CustomDataTableSearchbar;
