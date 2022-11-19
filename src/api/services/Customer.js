import * as httpRequest from '../../utils/httpRequest';

export const createAddress = async (table, data) => {
    let notification;
    try {
        let customerId = data.customerId;
        let newData = data.newData;
        let newElement = {
            streetName: newData.streetName,
            streetNumber: newData.streetNumber,
            additionalAddressLine: newData.additionalAddressLine,
            postcode: newData.postcode,
            city: newData.city,
            country: newData.country,
            notice: newData.notice,
            primary: newData.primary,
        };

        let res = await httpRequest.post(table + '/' + customerId + '/address', newElement);
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

export const updateAddress = async (table, data) => {
    let notification;
    try {
        let addressId = data.addressId;
        let customerId = data.customerId;
        let updatedData = data.updatedData;

        let updatedElement = {
            streetName: updatedData.streetName,
            streetNumber: updatedData.streetNumber,
            additionalAddressLine: updatedData.additionalAddressLine,
            postcode: updatedData.postcode,
            city: updatedData.city,
            country: updatedData.country,
            notice: updatedData.notice,
            primary: updatedData.primary,
        };

        let res = await httpRequest.put(table + '/' + customerId + '/address/' + addressId, updatedElement);
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
