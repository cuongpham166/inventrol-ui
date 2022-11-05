import * as httpRequest from '../../utils/httpRequest';

export const create = async (table, data) => {
    let notification;
    try {
        let newElement = {
            name: data.name,
            contactPerson: data.contactPerson,
            website: data.website,
            email: data.email,
            notice: data.notice,
            contact: {
                phoneNumber: data.phoneNumber,
                mobileNumber: data.mobileNumber,
                streetName: data.streetName,
                streetNumber: data.streetNumber,
                additionalAddressLine: data.additionalAddressLine,
                postcode: data.postcode,
                city: data.city,
                country: data.country,
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
