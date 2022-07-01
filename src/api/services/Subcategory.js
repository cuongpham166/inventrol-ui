import * as httpRequest from '../../utils/httpRequest';
export const getAll = async () => {
    try {
        const res = await httpRequest.get('subcategory');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const search = async (query) => {
    try {
        const res = await httpRequest.get('subcategory', { params: { q: query } });
        return res;
    } catch (error) {
        console.log(error);
    }
};
