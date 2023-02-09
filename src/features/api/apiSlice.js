// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with '/api'
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/' }),
    endpoints: (builder) => ({
        getBrands: builder.query({
            query: () => 'brand',
        }),
        getCategories: builder.query({
            query: () => 'category',
        }),
        getSubcategories: builder.query({
            query: () => 'subcategory',
        }),
        getAttributes: builder.query({
            query: () => 'attribute',
        }),
        getAttributeValues: builder.query({
            query: () => 'attribute-value',
        }),
        getCustomers: builder.query({
            query: () => 'customer',
        }),
        getSuppliers: builder.query({
            query: () => 'supplier',
        }),
        getPurchases: builder.query({
            query: () => 'purchase',
        }),
        getProducts: builder.query({
            query: () => 'product',
        }),
    }),
});

//use + endpoints attribute name (getAlbums) + Query = useGetAlbumsQuery.

export const {
    useGetBrandsQuery,
    useGetCategoriesQuery,
    useGetSubcategoriesQuery,
    useGetAttributesQuery,
    useGetAttributeValuesQuery,
    useGetCustomersQuery,
    useGetSuppliersQuery,
    useGetPurchasesQuery,
    useGetProductsQuery,
} = apiSlice;
