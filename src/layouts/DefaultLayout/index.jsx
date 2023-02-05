import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
const { Content } = Layout;
const DefaultLayout = ({ children }) => {
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sidebar />
            <Layout>
                <Header />
                <Layout>
                    <Content style={{ padding: '30px' }}>{children}</Content>
                    <Footer />
                </Layout>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
