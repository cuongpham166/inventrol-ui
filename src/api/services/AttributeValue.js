import * as httpRequest from '../../utils/httpRequest';

export const create = async (table, data) => {
    let notification;
    try {
        let newElement = {
            name: data.name,
            notice: data.notice,
            attribute: {
                name: data.attribute,
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
