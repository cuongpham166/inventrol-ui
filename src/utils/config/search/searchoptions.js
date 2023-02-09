const searchOptions = [
    { value: 'attribute', label: 'Attribute' },
    { value: 'attribute-value', label: 'Attribute Value' },
    { value: 'brand', label: 'Brand' },
    { value: 'category', label: 'Category' },
    { value: 'customer', label: 'Customer' },
    { value: 'subcategory', label: 'Subcategory' },
    { value: 'supplier', label: 'Supplier' },
];

searchOptions.sort((a, b) => a.value - b.value);

export default searchOptions;
