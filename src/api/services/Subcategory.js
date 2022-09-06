import * as httpRequest from '../../utils/httpRequest';

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
        newElement.category = data.category;
        data.notice === undefined ? (newElement.notice = '') : (newElement.notice = data.notice);
        newElement.isDeleted = false;
        const res = await httpRequest.post(table, newElement);
        return res;
    } catch (error) {
        console.log(error);
    }
};
