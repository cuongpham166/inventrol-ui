import Home from '../pages/Home';
import NoMatch from '../pages/Nomatch';

import CategoryList from '../pages/Category/List';
import { Subcategory, SubcategoryList, NewSubcategory } from '../pages/Subcategory';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/category', component: CategoryList },
    { path: '/subcategory', component: SubcategoryList },
    { path: '/subcategory/:id', component: Subcategory },
    { path: '/subcategory/add', component: NewSubcategory },
    { path: '*', component: NoMatch },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
