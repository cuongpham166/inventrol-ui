import Home from '../pages/Home';
import NoMatch from '../pages/Nomatch';

import { SubcategoryDetail, SubcategoryList, CreateSubcategory, EditSubcategory } from '../pages/Subcategory';
import { CategoryList, CategoryDetail, CreateCategory, EditCategory } from 'pages/Category';
import { SupplierDetail, SupplierList, CreateSupplier } from 'pages/Supplier';
import { ProductList, ProductDetail, CreateProduct, EditProduct } from 'pages/Product';
import { BrandList, BrandDetail, CreateBrand, EditBrand } from 'pages/Brand';
import { AttributeList, AttributeDetail, CreateAttribute, EditAttribute } from 'pages/Attribute';
import {
    AttributeValueList,
    AttributeValueDetail,
    CreateAttributeValue,
    EditAttributeValue,
} from 'pages/AttributeValue';

const publicRoutes = [
    { path: '/', component: Home },

    { path: '/category', component: CategoryList },
    { path: '/category/:id', component: CategoryDetail },
    { path: '/category/add', component: CreateCategory },
    { path: '/category/:id/edit', component: EditCategory },

    { path: '/subcategory', component: SubcategoryList },
    { path: '/subcategory/:id', component: SubcategoryDetail },
    { path: '/subcategory/add', component: CreateSubcategory },
    { path: '/subcategory/:id/edit', component: EditSubcategory },

    { path: '/supplier', component: SupplierList },
    { path: '/supplier/:id', component: SupplierDetail },
    { path: '/supplier/add', component: CreateSupplier },

    { path: '/inventory', component: ProductList },
    { path: '/inventory/:id', component: ProductDetail },
    { path: '/inventory/add', component: CreateProduct },
    { path: '/inventory/:id/edit', component: EditProduct },

    { path: '/brand', component: BrandList },
    { path: '/brand/:id', component: BrandDetail },
    { path: '/brand/add', component: CreateBrand },
    { path: '/brand/:id/edit', component: EditBrand },

    { path: '/attribute', component: AttributeList },
    /*{ path: '/attribute/:id', component: AttributeDetail },*/
    { path: '/attribute/add', component: CreateAttribute },
    { path: '/attribute/:id/edit', component: EditAttribute },

    { path: '/attribute-value', component: AttributeValueList },
    { path: '/attribute-value/:id', component: AttributeValueDetail },
    { path: '/attribute-value/add', component: CreateAttributeValue },
    { path: '/attribute-value/:id/edit', component: EditAttributeValue },

    { path: '*', component: NoMatch },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
