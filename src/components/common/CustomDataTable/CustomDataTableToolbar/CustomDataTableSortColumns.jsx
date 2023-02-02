import React, { useState, useEffect, useRef } from 'react';
import { Space, Button, Dropdown, Menu, Modal, Form, Tooltip } from 'antd';
import { EyeOutlined, ColumnHeightOutlined, DragOutlined } from '@ant-design/icons';

import { ToolOutlined } from '@ant-design/icons';

import { Reorder } from 'framer-motion';

import 'assets/styles/sortablelist.less';

const CustomDataTableSortColumns = ({ items, setListItems, onChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        return onChange();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Sort columns">
                <Button onClick={showModal} icon={<DragOutlined />}></Button>
            </Tooltip>

            <Modal
                title="Sort columns"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={300}
                okText="Sort"
            >
                <Reorder.Group axis="y" values={items} onReorder={setListItems} className="sortableList">
                    {items.map((item) => (
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
