import { Link } from 'react-router-dom';
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
];

export const topbar = {
    list: { title: 'List of Subcategories', subtitle: 'Product Managment' },
    new: { title: 'Create new Subcategory', subtitle: 'Product Managment' },
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
