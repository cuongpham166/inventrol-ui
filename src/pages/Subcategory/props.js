import { Link } from 'react-router-dom';
export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        width: 60,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={'/subcategory/' + record.id}>{text}</Link>,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
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
