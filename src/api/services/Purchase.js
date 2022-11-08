export const update = async (table, data) => {
    let notification;
    try {
        let elementId = data.id;
        let updatedElement = {
            courier: data.updatedData.courier,
            trackingNumber: data.updatedData.trackingNumber,
            notice: data.updatedData.notice,
        };
        console.log('updatedElement', updatedElement);
        //let res = await httpRequest.put(table + '/' + elementId, updatedElement);
        notification = {
            status: 'res.status',
            message: 'res.data.message',
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
