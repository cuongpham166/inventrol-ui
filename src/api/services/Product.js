import * as httpRequest from '../../utils/httpRequest';

export const create = async (table, data) => {
    let notification;
    console.log('Product');
    console.log(data);
    try {
        let newElement = {
            brand: { name: data.brand },
            discount: { discountPercent: data.discount },
            subcategory: { name: data.subcategory },
            listingPrice: data.listingPrice,
            retailPrice: data.retailPrice,
            supplier: [{ name: data.supplier[0] }], //sua la de nhap nhieu supplier
            attributeValue: [{ name: data.attributeValue[0] }], //sua la de nhap nhieu attributeValue
            name: data.name,
            barcode: data.barcode,
            sku: data.sku,
            vat: data.vat,
            notice: data.notice,
        };
        //let res = await httpRequest.post(table, newElement);
        console.log(newElement);
        notification = {
            status: 'res.status',
            message: 'res.data.message',
        };
        return notification;
    } catch (error) {
        notification = {
            status: error.response.status,
            message: error.response.data.message,
        };
        return notification;
    }
};
