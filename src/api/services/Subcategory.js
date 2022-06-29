import * as httpRequest from '../../utils/httpRequest';
export const getAll = async () => {
    try {
        const res = await httpRequest.get('subcategory');
        return res;
    } catch (error) {
        console.log(error);
    }
};
