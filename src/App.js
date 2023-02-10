import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import { ConfigProvider } from 'antd';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from 'utils/config/auth/keycloak';

import PrivateRoute from 'utils/helpers/PrivateRoute';
import io from 'socket.io-client';

import { useDispatch } from 'react-redux';
import { addNotification } from 'features/notification/notificationSlice';

import './App.less';

//const socket = io('http://localhost:3004');
function App() {
    /*const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const dispatch = useDispatch();

    const addNotificationHandler = (message) => {
        dispatch(addNotification(message));
    };

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('pong', () => {
            setLastPong(new Date().toISOString());
        });

        socket.on('message', (message) => {
            console.log('Received message: ', message);
            addNotificationHandler(message);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    const sendPing = () => {
        socket.emit('ping');
    };*/

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#7a3db8',
                },
            }}
        >
            <Router>
                <div className="App">
                    <Routes>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </ConfigProvider>
    );
}

export default App;
