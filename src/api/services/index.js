import * as httpRequest from '../../utils/httpRequest';
import * as categoryService from '../services/Category';
export const getAll = async (table) => {
    try {
        const res = await httpRequest.get(table);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const create = async (table, data) => {
    try {
        let res;
        switch (table) {
            case 'category':
                res = await categoryService.create(table, data);
                break;
            default:
                console.log('Error');
                break;
        }
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const update = async (table, data) => {
    try {
        let res;
        switch (table) {
            case 'category':
                res = await categoryService.update(table, data);
                break;
            default:
                console.log('Error');
                break;
        }
        return res;
    } catch (error) {
        console.error(error);
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
        foundResult.deleted = true;
        const res = await httpRequest.softDelete(table + '/' + id, foundResult);
        return res;
    } catch (error) {
        console.error(error);
    }
};
