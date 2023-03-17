import React, { useState } from 'react';
import { Button, Avatar, Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    HistoryOutlined,
    TransactionOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Export from '../Export/Export';
import FileUpload from '../FileUpload/FileUpload';
import Home from '../Home/Home';
import Modelling from '../Modelling/Modelling';
import User from '../User/User';
import HistoryData from '../HistoryData/HistoryData';
import Transfer from '../Transfer/Transfer';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const BasicLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed)

    }
    const avatarUrl = "assets/logo.png"


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider className="text-white" trigger={null} collapsible collapsed={collapsed}>

                <div className="w-full mt-3">
                    <div className="flex items-center">
                        <Avatar className=" ml-3" size={48} src={avatarUrl} />
                        <span className="ml-5"
                            style={{ display: collapsed ? 'none' : 'block' }}>{"Kingston Councils"}</span>
                    </div>
                </div>

                <Menu className="mt-3" theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
{/* 
                    <Menu.Item key="2" icon={<HistoryOutlined />}>

                        <Link to='/HistoryData'>History</Link>

                    </Menu.Item> */}

                    <SubMenu key="2" title="History" icon={<HistoryOutlined />}>

                        <Menu.Item>Policy</Menu.Item>
                        
                        <Menu.Item>Data</Menu.Item>

                        </SubMenu>


                    <SubMenu key="3" title="Model allocation" icon={<VideoCameraOutlined />}>

                            <Menu.Item>                    { <Link to='/modelling'>Model allocation</Link> }
                    </Menu.Item>
                        
                            <Menu.Item>Data</Menu.Item>
                        
                        </SubMenu>
               
                    {/* <Link to='/modelling'>Model allocation</Link> */}

                    <Menu.Item key="4" icon={<UploadOutlined />}>
                        <Link to='/FileUpload'>Load data</Link>
                    </Menu.Item>

                    <Menu.Item key="5" icon={<TransactionOutlined />}>
                        <Link to='/transfer'>transfer</Link>
                    </Menu.Item>

                    <Menu.Item key="6" icon={<UploadOutlined />}>
                        <Link to='/Export'>Foreast</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className="site-layout">
                <Header className=" bg-amber-50 border-2" style={{ backgroundColor: "#edeeeb" }}>
                    <div className="flex items-center" >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                        <span className="  ml-auto">
                            <Avatar className="mr-2" size={48} src={avatarUrl} />
                            <span >
                                <Link to='/User'>{"Kingston Councils"}</Link>
                            </span>
                        </span>

                    </div>
                </Header>

                <Content
                    className="site-layout-background"
                    style={{

                        padding: 24,
                        minHeight: 280,
                        backgroundColor: "#eef1e8"
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/HistoryData" element={<HistoryData />} />

                        <Route path="/Export" element={<Export />} />

                        <Route path="/FileUpload" element={<FileUpload />} />

                        <Route path="/Modelling" element={<Modelling />} />

                        <Route path="/User" element={<User />} />

                        <Route path="/transfer" element={<Transfer />} />


                    </Routes>
                </Content>

                <footer className="h-36 " style={{
                    backgroundColor: "#3c3c3c",
                }} >
                    <div className="flex justify-center w-full">
                        <div className="flex items-center">
                            <img src="https://www.kingston.gov.uk/site/dist/images/site-logo-white.svg" alt="logo" className="w-24  ml-10 mt-5" />

                        </div>

                    </div>
                </footer>
            </Layout>
        </Layout>

    );
}

export default BasicLayout;
