import * as httpRequest from '../../utils/httpRequest';

export const create = async (table, data) => {
    let notification;
    try {
        let newCategory = {
            name: data.name,
            notice: data.notice,
            tagColor: data.tagColor.hex.toLowerCase(),
        };
        let res = await httpRequest.post(table, newCategory);
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
        let attributeId = data.id;
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
        let res = await httpRequest.put(table + '/' + attributeId, updatedElement);
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
