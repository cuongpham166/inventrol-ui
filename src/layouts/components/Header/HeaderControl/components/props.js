const renderOptionItem = (title, value) => ({
    label: title,
    value: value,
});

export const selectSearchOptions = [
    renderOptionItem('Attribute', 'attribute'),
    renderOptionItem('Attribute Value', 'attribute-value'),
    renderOptionItem('Category', 'category'),
    renderOptionItem('Product', 'product'),
    renderOptionItem('Subcategory', 'subcategory'),
    renderOptionItem('Supplier', 'supplier'),
];
