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
    try {
        let res;
        let categoryName = data.category;
        let categoryId = await getCategoryIdByName(categoryName);
        if (categoryId != '') {
            let newElement = {
                name: data.name,
                notice: data.notice,
                tagColor: data.tagColor.hex,
                category: {
                    id: categoryId,
                },
            };
            res = await httpRequest.post(table, newElement);
        } else {
            res = { status: '', statusText: 'Error' };
        }
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const update = async (table, data) => {
    let notification;
    try {
        let subcategoryId = data.id;
        let categoryName = data.updatedData.category;
        let updatedElement = {
            name: data.updatedData.name,
            notice: data.updatedData.notice,
            tagColor: data.updatedData.tagColor.toLowerCase(),
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
