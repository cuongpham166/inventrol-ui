import * as httpRequest from '../../utils/httpRequest';
import * as service from '../services/index';

/*export const create = async (table, data) => {
    try {
        let res;
        let categoryName = data.name;
        let categoryList = await service.getAll('category');
        let foundCategory = categoryList.some((cat) => cat.name === categoryName);
        if (!foundCategory) {
            let newElement = {
                name: data.name,
                notice: data.notice,
                tagColor: data.tagColor.hex,
            };
            res = await httpRequest.post(table, newElement);
        } else {
            let statusText = 'Dupplicate Category ' + categoryName + '. Try another name';
            res = { status: '', statusText: statusText };
        }
        return res;
    } catch (error) {
        console.log(error);
    }
};*/

export const create = async (table, data) => {
    let notification;
    try {
        let newElement = {
            name: data.name,
            notice: data.notice,
            tagColor: data.tagColor.hex.toLowerCase(),
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
        let categoryId = data.id;
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
        };
        let res = await httpRequest.put(table + '/' + categoryId, updatedElement);
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
