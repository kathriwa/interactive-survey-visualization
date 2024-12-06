import React, { useState } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import './index.css';
import {
  DesktopOutlined,
  PieChartOutlined,
  HomeOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Content, Footer, Sider } = Layout;

import Home from './Home';
import MyTable from './Table';
import MyPlot from './Charts';
import Papers from './Papers';


const items = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: '2',
    icon: <SnippetsOutlined />,
    label: <Link to="/papers">Papers</Link>,
  },
  {
    key: '3',
    icon: <DesktopOutlined />,
    label: <Link to="/characteristics">User Characteristics Table</Link>,
  },
  {
    key: '4',
    icon: <PieChartOutlined />,
    label: <Link to="/charts">Charts</Link>,
  }
];

const getCurrentPageKey = (pathname: string) => {
  switch (pathname) {
    case '/':
      return '1';
    case '/papers':
      return '2';
    case '/characteristics':
      return '3';
    case '/charts':
      return '4';
    default:
      return '1'; // Default to 'Home' if path is not recognized
  }
};


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPageKey = getCurrentPageKey(location.pathname);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
      <Layout style={{ minHeight: '100vh', width: '100%' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
          {/* <div className="demo-logo-vertical" /> */}
          <br></br>
          <Menu defaultSelectedKeys={[currentPageKey]} mode="inline" items={items} />
        </Sider>
        <Layout style={{ padding: '30px 30px 0 30px', width: '100%' }}>
          <Content>
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                  <Route path={"/"} element={<Home />} />
                  <Route path="/charts" element={<MyPlot />} />
                  <Route path="/characteristics" element={<MyTable />} />
                  <Route path="/papers" element={<Papers />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Literature Review ©{new Date().getFullYear()} Created at the University of Zürich
          </Footer>
        </Layout>
      </Layout>
  );
};

export default App;