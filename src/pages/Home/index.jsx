import React, { useState, useEffect } from 'react';
import { BlockPicker } from 'react-color';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';

const DashboardPage = (props) => {
    const [blockPickerColor, setBlockPickerColor] = useState('#37d67a');

    const onChangeColor = (color) => {
        console.log(color.hex);
        setBlockPickerColor(color.hex);
    };
    return (
        <>
            <div>Dashboard</div>
            <div>
                <Colorpicker
                    popup
                    blockStyles={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                    }}
                    picker={'SketchPicker'}
                    onChange={onChangeColor}
                    value={blockPickerColor}
                />
            </div>
        </>
    );
};

export default DashboardPage;
