import { configureStore } from '@reduxjs/toolkit';

import dashboardReducer from 'features/dashboard/dashboardSlice';
import notificationReducer from 'features/notification/notificationSlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        notifications: notificationReducer,
    },
});
