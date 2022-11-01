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

const getCategoryIdByName = async (categoryName) => {
    let categoryId;
    let categoryList = await service.getAll('category');
    let foundCategory = categoryList.find((res) => res.name === categoryName);
    foundCategory != undefined ? (categoryId = parseInt(foundCategory.id)) : (categoryId = '');
    return categoryId;
};

export const create = async (table, data) => {
    let notification;
    try {
        let newElement = {
            name: data.name,
            notice: data.notice,
            tagColor: data.tagColor.hex.toLowerCase(),
            category: {
                name: data.category,
            },
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

export const update = async (table, data) => {
    let notification;
    try {
        let subcategoryId = data.id;
        let categoryName = data.updatedData.category;
        let updatedTagcolor;
        if (typeof data.updatedData.tagColor == 'object') {
            updatedTagcolor = data.updatedData.tagColor.hex.toLowerCase();
        }

        if (typeof data.updatedData.tagColor == 'string') {
            updatedTagcolor = data.updatedData.tagColor.toLowerCase();
        }
        let updatedElement = {
            name: data.updatedData.name,
            notice: data.updatedData.notice,
            tagColor: updatedTagcolor,
            category: {
                name: categoryName,
            },
        };
        let res = await httpRequest.put(table + '/' + subcategoryId, updatedElement);
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
