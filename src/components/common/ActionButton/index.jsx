import { Link } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import { ShoppingCartOutlined, EditOutlined } from '@ant-design/icons';
const ActionButton = ({ table, id }) => {
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
        case 'purchase':
            actionButtons = <></>;
            break;
        default:
            actionButtons = (
                <Link to={'/' + table + '/' + id + '/edit'}>
                    <Button type="primary" icon={<EditOutlined />}></Button>
                </Link>
            );
            break;
    }
    return <>{actionButtons}</>;
};

export default ActionButton;
