import * as httpRequest from '../../utils/httpRequest';

export const create = async (table, data) => {
    try {
        const res = await httpRequest.post(table, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const update = async (table, data) => {
    try {
        const res = await httpRequest.put(table + '/' + data.id, data.updatedData);
        return res;
    } catch (error) {
        console.error(error);
    }
};
