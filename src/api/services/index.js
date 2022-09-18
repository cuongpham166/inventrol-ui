import * as httpRequest from '../../utils/httpRequest';
export const getAll = async (table) => {
    try {
        const res = await httpRequest.get(table);
        return res;
    } catch (error) {
        console.log(error);
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
        const res = await httpRequest.get(table, { params: { q: query } });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteById = async (table, id) => {
    try {
        const foundResult = await httpRequest.get(table + '/' + id);
        foundResult.isDeleted = true;
        const res = await httpRequest.softDelete(table + '/' + id, foundResult);
        return res;
    } catch (error) {
        console.error(error);
    }
};
