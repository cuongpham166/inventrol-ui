import Home from '../pages/Home';
import NoMatch from '../pages/Nomatch';

import { SubcategoryDetail, SubcategoryList, CreateSubcategory, EditSubcategory } from '../pages/Subcategory';
import { CategoryList, CategoryDetail, CreateCategory, EditCategory } from 'pages/Category';
import { SupplierDetail, SupplierList, CreateSupplier, EditSupplier, CreatePurchase } from 'pages/Supplier';
import { ProductList, ProductDetail, CreateProduct, EditProduct } from 'pages/Product';
import { BrandList, BrandDetail, CreateBrand, EditBrand } from 'pages/Brand';
import { AttributeList, AttributeDetail, CreateAttribute, EditAttribute } from 'pages/Attribute';
import {
    AttributeValueList,
    AttributeValueDetail,
    CreateAttributeValue,
    EditAttributeValue,
} from 'pages/AttributeValue';
import { PurchaseDetail, PurchaseList } from 'pages/Purchase';

import { DiscountList, DiscountDetail, EditDiscount, CreateDiscount } from 'pages/Discount';

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
    { path: '/supplier/:id/edit', component: EditSupplier },
    { path: '/supplier/:id/purchase/add', component: CreatePurchase },

    { path: '/product', component: ProductList },
    { path: '/product/:id', component: ProductDetail },
    { path: '/product/add', component: CreateProduct },
    { path: '/product/:id/edit', component: EditProduct },

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

    { path: '/discount', component: DiscountList },
    { path: '/discount/:id', component: DiscountDetail },
    { path: '/discount/add', component: CreateDiscount },
    { path: '/discount/:id/edit', component: EditDiscount },

    { path: '/purchase', component: PurchaseList },
    { path: '/purchase/:id', component: PurchaseDetail },
    //{ path: '/purchase/add', component: CreatePurchase },
    //{ path: '/purchase/:id/edit', component: EditPurchase },

    { path: '*', component: NoMatch },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
