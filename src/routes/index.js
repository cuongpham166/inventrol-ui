import DashboardPage from '../pages/DashboardPage';
import CategoryPage from '../pages/CategoryPage';
import SubcategoryPage from '../pages/SubcategoryPage';
const publicRoutes = [
    { path: '/', component: DashboardPage },
    { path: '/category', component: CategoryPage },
    { path: '/subcategory', component: SubcategoryPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
