import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Space } from 'antd';
const Breadcrumb = () => {
    const location = useLocation();
    const { pathname } = location;
    const pathnames = pathname.split('/').filter((item) => item);
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
        <div>
            <AntBreadcrumb
                style={{
                    marginBottom: 20,
                    fontWeight: 'bold',
                }}
            >
                {pathnames.length > 0 ? (
                    <AntBreadcrumb.Item>
                        <Link to="/">
                            <Space>
                                <HomeOutlined />
                            </Space>
                        </Link>
                    </AntBreadcrumb.Item>
                ) : (
                    <AntBreadcrumb.Item>
                        <Space>
                            <HomeOutlined />
                        </Space>
                    </AntBreadcrumb.Item>
                )}
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <AntBreadcrumb.Item key={index}>{capatilize(name)}</AntBreadcrumb.Item>
                    ) : (
                        <AntBreadcrumb.Item key={index}>
                            <Link to={`${routeTo}`}>{capatilize(name)}</Link>
                        </AntBreadcrumb.Item>
                    );
                })}
            </AntBreadcrumb>
        </div>
    );
};

export default Breadcrumb;
