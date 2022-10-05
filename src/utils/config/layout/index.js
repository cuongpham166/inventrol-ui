import {
    AppstoreOutlined,
    ShopOutlined,
    CodeSandboxOutlined,
    TagOutlined,
    TagsOutlined,
    SolutionOutlined,
    UserOutlined,
    FileTextOutlined,
    FilePdfOutlined,
    FileWordOutlined,
    FileExcelOutlined,
} from '@ant-design/icons';

export const form = {
    mainLayout: {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 5,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
        layout: 'horizontal',
    },
    tailLayout: {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 5,
            },
        },
    },
    validateMessages: {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    },
};

export const message = {
    top: 50,
    duration: 3,
    maxCount: 3,
    rtl: true,
};

const getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
};

/*export const sidebarItems = [
    getItem('Dashboard', 'dashboard', <AppstoreOutlined />),
    getItem('Inventory', 'inventory', <ShopOutlined />),
    getItem('Products', 'product', <CodeSandboxOutlined />, [
        getItem('Category', 'category', <TagOutlined />),
        getItem('Subcategory', 'subcategory', <TagsOutlined />),
        getItem('Brand', 'brand', <TagOutlined />),
        getItem('Tag', 'tag', <TagOutlined />),
        getItem('Attribute', 'attribute', <TagOutlined />),
        getItem('AttributeValue', 'attributeValue', <TagOutlined />),
    ]),
    getItem('Suppliers', 'supplier', <SolutionOutlined />),
    getItem('Customers', 'customer', <UserOutlined />),
];*/

export const sidebarItems = [
    getItem('Dashboard', 'dashboard', <AppstoreOutlined />),
    getItem('Inventory', 'inventory', <ShopOutlined />),
    getItem(
        'Management',
        'management',
        null,
        [
            getItem('Products', 'product', <CodeSandboxOutlined />, [
                getItem('Category', 'category', <TagOutlined />),
                getItem('Subcategory', 'subcategory', <TagsOutlined />),
                getItem('Brand', 'brand', <TagOutlined />),
                getItem('Attribute', 'attribute', <TagOutlined />),
                getItem('Attribute Value', 'attribute-value', <TagOutlined />),
            ]),
            getItem('Suppliers', 'supplier', <SolutionOutlined />),
            getItem('Customers', 'customer', <UserOutlined />),
        ],
        'group',
    ),
];

export const exportItems = [
    {
        label: 'Export as PDF',
        key: 'pdf',
        icon: <FilePdfOutlined />,
    },
    {
        label: 'Export as Word',
        key: 'word',
        icon: <FileWordOutlined />,
    },
    {
        label: 'Export as CSV',
        key: 'csv',
        icon: <FileTextOutlined />,
    },
    {
        label: 'Export as Excel',
        key: 'excel',
        icon: <FileExcelOutlined />,
    },
];
