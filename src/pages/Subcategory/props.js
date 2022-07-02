import { Link } from 'react-router-dom';
import ActionMenu from '../../components/ActionMenu';
export const tableColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={'/subcategory/' + record.id}>{text}</Link>,
    },
    {
        title: 'Updated Date',
        dataIndex: 'updatedDate',
        key: 'updatedDate',
    },
    {
        title: 'Updated Time',
        dataIndex: 'updatedTime',
        key: 'updatedTime',
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => <ActionMenu />,
    },
];

export const topbar = {
    title: 'List of Subcategories',
    subtitle: 'Product Managment',
    buttonText: 'Create Subcategory',
    searchbarPlaceholder: 'Search a Subcategory',
};

export const toolbar = {
    searchPlaceholder: 'Search a Subcategory',
};

export const formComponents = [
    {
        component: 'input',
        label: 'Name',
        required: true,
    },
    {
        component: 'input',
        label: 'Notice',
    },
];
