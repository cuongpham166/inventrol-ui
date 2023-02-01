import React from 'react';
import { Input } from 'antd';
const { Search } = Input;
const CustomDataTableSearchbar = (props) => {
    const onSearch = (value) => console.log(value);
    return (
        <div>
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </div>
    );
};

export default CustomDataTableSearchbar;
