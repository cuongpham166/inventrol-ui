import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
const ExtraActionButton = ({ table, id }) => {
    let actionButtons;
    if (table == 'supplier') {
        actionButtons = (
            <Link to={'/' + table + '/' + id + '/purchase/add'}>
                <Button type="primary" icon={<ShoppingCartOutlined />}></Button>
            </Link>
        );
    } else {
        actionButtons = <></>;
    }

    return <>{actionButtons}</>;
};

export default ExtraActionButton;
