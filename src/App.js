import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import { ConfigProvider } from 'antd';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from 'utils/config/auth/keycloak';

import PrivateRoute from 'utils/helpers/PrivateRoute';

import './App.less';
function App() {
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
