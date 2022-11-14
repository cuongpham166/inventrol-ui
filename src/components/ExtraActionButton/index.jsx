import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
const ExtraActionButton = ({ table, id }) => {
    let actionButtons;
    switch (table) {
        case 'supplier':
            actionButtons = (
                <Link to={'/' + table + '/' + id + '/purchase/add'}>
                    <Button type="primary" icon={<ShoppingCartOutlined />}></Button>
                </Link>
            );
            break;
        case 'customer':
            actionButtons = (
                <Link to={'/' + table + '/' + id + '/order/add'}>
                    <Button type="primary" icon={<ShoppingCartOutlined />}></Button>
                </Link>
            );
            break;
        default:
            actionButtons = <></>;
            break;
    }
    return <>{actionButtons}</>;
};

export default ExtraActionButton;
