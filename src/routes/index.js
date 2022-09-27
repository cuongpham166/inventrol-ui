import Home from '../pages/Home';
import NoMatch from '../pages/Nomatch';

import { SubcategoryDetail, SubcategoryList, CreateSubcategory, EditSubcategory } from '../pages/Subcategory';
import { CategoryList, CreateCategory, EditCategory } from 'pages/Category';
import { SupplierDetail, SupplierList, CreateSupplier } from 'pages/Supplier';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/category', component: CategoryList },
    { path: '/category/add', component: CreateCategory },
    { path: '/category/:id/edit', component: EditCategory },
    { path: '/subcategory', component: SubcategoryList },
    { path: '/subcategory/:id', component: SubcategoryDetail },
    { path: '/subcategory/add', component: CreateSubcategory },
    { path: '/subcategory/:id/edit', component: EditSubcategory },
    { path: '/supplier', component: SupplierList },
    { path: '/supplier/:id', component: SupplierDetail },
    { path: '/supplier/add', component: CreateSupplier },
    { path: '*', component: NoMatch },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
