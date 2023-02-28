import Home from '../pages/Home';
import NoMatch from '../pages/Nomatch';

import { SubcategoryList } from '../pages/Subcategory';
import { CategoryList } from 'pages/Category';
import { SupplierDetail, SupplierList, CreatePurchase, SupplierPurchaseList } from 'pages/Supplier';
import { ProductList, ProductDetail } from 'pages/Product';
import { BrandList } from 'pages/Brand';
import { AttributeList } from 'pages/Attribute';
import { AttributeValueList } from 'pages/AttributeValue';
import { PurchaseDetail, PurchaseList } from 'pages/Purchase';

import { DiscountList } from 'pages/Discount';
import { CustomerList, CustomerDetail, AddressBook, NewOrder } from 'pages/Customer';
import {
    OnlineOrderList,
    OnlineOrderDetail,
    OnlineOrderShipping,
    OnlineOrderPayment,
    DirectOrderDetail,
    DirectOrderList,
    OrderList,
    NewDirectOrder,
} from 'pages/Order';

import { SettingList } from 'pages/Setting';

const privateRoutes = [
    { path: '/', component: Home },

    //Metadata
    { path: '/attribute', component: AttributeList },
    { path: '/attribute-value', component: AttributeValueList },
    { path: '/brand', component: BrandList },
    { path: '/category', component: CategoryList },
    { path: '/discount', component: DiscountList },
    { path: '/subcategory', component: SubcategoryList },
    //Metadata

    { path: '/supplier', component: SupplierList },
    { path: '/supplier/:id', component: SupplierDetail },
    { path: '/supplier/:id/purchase', component: SupplierPurchaseList },

    { path: '/supplier/:id/purchase/add', component: CreatePurchase },

    { path: '/product', component: ProductList },
    { path: '/product/:id', component: ProductDetail },

    { path: '/purchase', component: PurchaseList },
    { path: '/purchase/:id', component: PurchaseDetail },
    //{ path: '/purchase/:id/edit', component: EditPurchase },

    { path: '/customer', component: CustomerList },
    { path: '/customer/:id', component: CustomerDetail },
    { path: '/customer/:id/address', component: AddressBook },
    { path: '/customer/:id/order/add', component: NewOrder },

    { path: '/order', component: OrderList },
    { path: '/online-order', component: OnlineOrderList },
    { path: '/online-order/shipping', component: OnlineOrderDetail },
    { path: '/online-order/payment', component: OnlineOrderShipping },
    { path: '/online-order/:id', component: OnlineOrderPayment },

    { path: '/direct-order', component: DirectOrderList },
    { path: '/pos', component: NewDirectOrder },

    { path: '/setting', component: SettingList },

    { path: '*', component: NoMatch },
];

const publicRoutes = [];

export { publicRoutes, privateRoutes };
