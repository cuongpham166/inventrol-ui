import * as httpRequest from '../../utils/httpRequest';
import * as categoryService from '../services/Category';
import * as subcategoryService from '../services/Subcategory';
import * as supplierService from '../services/Supplier';
import * as attributeService from '../services/Attribute';
import * as attributeValueService from '../services/AttributeValue';
import * as brandService from '../services/Brand';
import * as productService from '../services/Product';
import * as purchaseService from '../services/Purchase';

export const getAll = async (table) => {
    try {
        const results = await httpRequest.get(table);
        let data;
        if (results != '') {
            data = results.filter((result) => result.deleted === false);
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const create = async (table, data) => {
    try {
        let res;
        switch (table) {
            case 'brand':
                res = await brandService.create(table, data);
                break;
            case 'category':
                res = await categoryService.create(table, data);
                break;
            case 'subcategory':
                res = await subcategoryService.create(table, data);
                break;
            case 'attribute':
                res = await attributeService.create(table, data);
                break;
            case 'attribute-value':
                res = await attributeValueService.create(table, data);
                break;
            case 'supplier':
                res = await supplierService.create(table, data);
                break;
            case 'product':
                res = await productService.create(table, data);
                break;
            default:
                console.log('Error');
                break;
        }
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const update = async (table, data) => {
    try {
        let res;
        switch (table) {
            case 'category':
                res = await categoryService.update(table, data);
                break;
            case 'subcategory':
                res = await subcategoryService.update(table, data);
                break;
            case 'attribute':
                res = await attributeService.update(table, data);
                break;
            case 'purchase':
                res = await purchaseService.update(table, data);
                break;
            default:
                console.log('Error');
                break;
        }
        return res;
    } catch (error) {
        console.error(error);
    }
};
export const getById = async (table, id) => {
    try {
        const res = await httpRequest.get(table + '/' + id);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const search = async (table, query) => {
    try {
        const results = await httpRequest.get(table, { params: { name: query } });
        let data;
        if (results != '') {
            data = results.filter((result) => result.deleted === false);
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteById = async (table, id) => {
    try {
        const res = await httpRequest.softDelete(table + '/' + id + '/delete');
        return res;
    } catch (error) {
        console.error(error);
    }
};
