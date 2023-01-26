import * as httpRequest from '../../utils/httpRequest';

export const create = async (table, data) => {
    let notification;
    try {
        let attributeValueList = [];
        let supplierList = [];
        data.attributeValue.map((val, index) => {
            let attEle = { id: val };
            attributeValueList.push(attEle);
        });
        data.supplier.map((val, index) => {
            let supEle = { id: val };
            supplierList.push(supEle);
        });
        let newElement = {
            brand: { id: data.brand },
            discount: { id: data.discount },
            subcategory: { id: data.subcategory },
            listingPrice: data.listingPrice,
            retailPrice: data.retailPrice,
            supplier: supplierList,
            attributeValue: attributeValueList,
            name: data.name,
            barcode: data.barcode,
            sku: data.sku,
            vat: data.vat,
            notice: data.notice,
        };
        let res = await httpRequest.post(table, newElement);
        notification = {
            status: res.status,
            message: res.data.message,
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
