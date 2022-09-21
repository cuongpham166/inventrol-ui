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
        let foundSubcategory = await service.getById(table, data.id);
        foundSubcategory.name = data.updatedSubcategory.name;
        foundSubcategory.category_id = parseInt(data.updatedSubcategory.category);
        data.updatedSubcategory.notice === undefined
            ? (foundSubcategory.notice = '')
            : (foundSubcategory.notice = data.updatedSubcategory.notice);
        foundSubcategory.updated_date = '28-11-2021';
        const res = await httpRequest.put(table + '/' + data.id, foundSubcategory);
        return res;
    } catch (error) {
        console.error(error);
    }
};
