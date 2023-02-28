import React, { useState, useEffect, useRef, createContext } from 'react';

import { Row, Col, Table } from 'antd';

import DirectOrderProductList from 'components/Order/OrderCart/DirectOrderCart/DirectOrderProductList';
import DirectOrderSummary from 'components/Order/OrderCart/DirectOrderCart/DirectOrderSummary';

export const DirectOrderCartContext = createContext();

const NewDirectOrder = (props) => {
    const [directOrderCartData, setDirectOrderCartData] = useState([]);
    return (
        <>
            <DirectOrderCartContext.Provider
                value={{ directOrderCartData: directOrderCartData, setDirectOrderCartData: setDirectOrderCartData }}
            >
                <Row style={{}} justify="center" gutter={[24, 24]}>
                    <>
                        <Col span={13} style={{}}>
                            <DirectOrderProductList />
                        </Col>
                        <Col span={11}>
                            <DirectOrderSummary />
                        </Col>
                    </>
                </Row>
            </DirectOrderCartContext.Provider>
        </>
    );
};

export default NewDirectOrder;
