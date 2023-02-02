import Home from '../pages/Home';
import NoMatch from '../pages/Nomatch';

import { SubcategoryDetail, SubcategoryList, CreateSubcategory, EditSubcategory } from '../pages/Subcategory';
import { CategoryList, CategoryDetail, CreateCategory, EditCategory } from 'pages/Category';
import {
    SupplierDetail,
    SupplierList,
    CreateSupplier,
    EditSupplier,
    CreatePurchase,
    SupplierPurchaseList,
} from 'pages/Supplier';
import { ProductList, ProductDetail, CreateProduct, EditProduct } from 'pages/Product';
import { BrandList, BrandDetail, CreateBrand, EditBrand } from 'pages/Brand';
import { AttributeList, CreateAttribute, EditAttribute } from 'pages/Attribute';
import {
    AttributeValueList,
    AttributeValueDetail,
    CreateAttributeValue,
    EditAttributeValue,
} from 'pages/AttributeValue';
import { PurchaseDetail, PurchaseList, PurchaseShipping } from 'pages/Purchase';

import { DiscountList, DiscountDetail, EditDiscount, CreateDiscount } from 'pages/Discount';
import { CustomerList, CustomerDetail, EditCustomer, CreateCustomer, AddressBook, NewOrder } from 'pages/Customer';
import { OrderList, OrderDetail, OrderShipping, OrderPayment } from 'pages/Order';

import { SettingList } from 'pages/Setting';

const privateRoutes = [
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
    { path: '/supplier/:id/purchase', component: SupplierPurchaseList },
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
    { path: '/purchase/shipping', component: PurchaseShipping },
    { path: '/purchase/:id', component: PurchaseDetail },
    //{ path: '/purchase/:id/edit', component: EditPurchase },

    { path: '/customer', component: CustomerList },
    { path: '/customer/:id', component: CustomerDetail },
    { path: '/customer/:id/address', component: AddressBook },
    { path: '/customer/add', component: CreateCustomer },
    { path: '/customer/:id/edit', component: EditCustomer },
    { path: '/customer/:id/order/add', component: NewOrder },

    { path: '/order', component: OrderList },
    { path: '/order/shipping', component: OrderShipping },
    { path: '/order/payment', component: OrderPayment },
    { path: '/order/:id', component: OrderDetail },

    { path: '/setting', component: SettingList },

    { path: '*', component: NoMatch },
];

const publicRoutes = [];

export { publicRoutes, privateRoutes };
