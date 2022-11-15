import React from 'react';
import { Button, Card } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
const OrderActionButton = (props) => {
    return (
        <>
            <Card bordered={false} style={{}}>
                <Button
                    type="primary"
                    disabled={props.cartData.length > 0 ? false : true}
                    icon={<ShoppingCartOutlined />}
                    onClick={(e) => {
                        //e.stopPropagation();
                    }}
                >
                    Place Order
                </Button>
            </Card>
        </>
    );
};

export default OrderActionButton;
