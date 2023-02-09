import { createSlice } from '@reduxjs/toolkit';

import * as dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        addNotification: (state, action) => {
            const notification = {
                id: state.length + 1,
                text: action.payload,
                time: dayjs(Date.now()).format('DD/MM/YYYY [-] HH:mm'),
            };
            state.push(notification);
        },
        removeNotification: (state, action) => {
            return state.filter((notification) => notification.id !== action.payload);
        },
    },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
