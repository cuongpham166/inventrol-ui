import React, { useState, useEffect, useRef } from 'react';
import { Space, Button, Dropdown, Menu, Modal, Form, Tooltip } from 'antd';
import { EyeOutlined, ColumnHeightOutlined, DragOutlined } from '@ant-design/icons';

import { ToolOutlined } from '@ant-design/icons';

import { Reorder } from 'framer-motion';

import 'assets/styles/sortablelist.less';

const CustomDataTableSortColumns = (props) => {
    const [listItems, setListItems] = useState(['Id', 'Name', 'Created on', 'Actions']);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        //Runs on the first render
        //And any time any dependency value changes
        console.log('change');
        console.log(listItems);
    }, [listItems]);

    return (
        <>
            <Tooltip title="Sort columns">
                <Button onClick={showModal} icon={<DragOutlined />}></Button>
            </Tooltip>

            <Modal title="Sort columns" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={300}>
                <Reorder.Group axis="y" values={listItems} onReorder={setListItems} className="sortableList">
                    {listItems.map((item) => (
                        <Reorder.Item key={item} value={item} className="sortableList_element">
                            {item}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </Modal>
        </>
    );
};

export default CustomDataTableSortColumns;
