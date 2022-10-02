import * as httpRequest from '../../utils/httpRequest';
import * as service from '../services/index';

export const search = async (query) => {
    try {
        const res = await httpRequest.get('subcategory', { params: { q: query } });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const create = async (table, data) => {
    try {
        const newElement = {};
        newElement.name = data.name;
        newElement.category_id = parseInt(data.category);
        data.notice === undefined ? (newElement.notice = '') : (newElement.notice = data.notice);
        newElement.is_deleted = false;
        newElement.created_date = '27-11-2021';
        const res = await httpRequest.post(table, newElement);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const update = async (table, data) => {
    try {
        let subcategoryId = data.id;
        let subcategoryData = data.updatedSubcategory;
        const res = await httpRequest.put(table + '/' + subcategoryId, subcategoryData);
        return null;
    } catch (error) {
        console.error(error);
    }
};
