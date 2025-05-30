import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { HomeOutlined, PictureOutlined, TagsOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer } = AntLayout;

const Layout: React.FC = () => {
  return (
    <AntLayout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        <div style={{ float: 'left', width: '120px', height: '31px', margin: '16px 24px 16px 0', background: 'rgba(0, 0, 0, 0.2)' }}>
          建筑图库
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: <Link to="/">首页</Link>,
            },
            {
              key: '2',
              icon: <PictureOutlined />,
              label: <Link to="/gallery">图库</Link>,
            },
            {
              key: '3',
              icon: <TagsOutlined />,
              label: <Link to="/categories">分类</Link>,
            },
          ]}
        />
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        建筑图库 ©{new Date().getFullYear()} Created with React
      </Footer>
    </AntLayout>
  );
};

export default Layout; 