import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
const { Search } = Input;

const useSearchbar = ({ table }) => {
    const [searchValue, setSearchValue] = useState(null);

    const onSearch = (value) => {
        setSearchValue(value);
    };
    const Searchbar = () => (
        <>
            <Search placeholder={'Search ' + table} onSearch={onSearch} enterButton />
        </>
    );
    return { Searchbar, searchValue };
};

export default useSearchbar;
