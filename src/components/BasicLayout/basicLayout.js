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
import Export from '../Export/export';
import FileUpload from '../FileUpload/fileUpload';
import Home from '../Home/home';
import Modelling from '../Modelling/modelling';
import ModelData from '../ModelData/modelData';
import User from '../User/user';
import HistoryAnalysis from '../HistoryAnalysis/historyAnalysis';
import HistoryData from '../HistoryData/historyData';
import Transfer from '../Transfer/transfer';
import TransferSystem from '../TransferSystem/transferSystem';
import TransferUpload from '../TransferUpload/transferUpload';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const BasicLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed)

    }
    const logo = "https://www.kingston.gov.uk/site/dist/images/site-logo.svg"

    const logoWhite = "https://www.kingston.gov.uk/site/dist/images/site-logo-white.svg"


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider className="text-white" trigger={null} collapsible collapsed={collapsed}>

                <div className="w-full mt-3">
                    <div className="flex items-center">
                        <Avatar className=" ml-3" size={48} src={logoWhite} />
                        <span className="ml-5"
                            style={{ display: collapsed ? 'none' : 'block' }}><Link to='/User'>{"Kingston Councils"}</Link></span>
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

                        <Menu.Item>{<Link to='/HistoryAnalysis'>Policy</Link>}</Menu.Item> 
                        
                        <Menu.Item>{<Link to='/HistoryData'>Data</Link>}</Menu.Item>

                        </SubMenu>


                    <SubMenu key="3" title="Forecast" icon={<VideoCameraOutlined />}>
                            <Menu.Item>{<Link to='/FileUpload'>Load data</Link>}</Menu.Item> 

                            <Menu.Item>{<Link to='/Modelling'>Model</Link>}</Menu.Item> 
                        
                            <Menu.Item>{<Link to='/ModelData'>Data</Link>}</Menu.Item> 
                        
                        </SubMenu>
               
                    {/* <Link to='/modelling'>Model allocation</Link> */}


                    <SubMenu key="4" title = "Transfer" icon={<TransactionOutlined />}>

                        <Menu.Item>
                            { <Link to='/TransferUpload'>Load Data</Link> }
                        </Menu.Item>

                        <Menu.Item>
                            {<Link to='/TransferSystem'>System</Link>}
                        </Menu.Item>

                        <Menu.Item>
                            { <Link to='/Transfer'>Data</Link> }
                        </Menu.Item>


                    </SubMenu>

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
                            <Avatar className="mr-2" size={48} src={logo} />
                            <span >
                                <Link to='/User'>{""}</Link>
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

                        <Route path="/HistoryAnalysis" element={<HistoryAnalysis />} />

                        <Route path="/HistoryData" element={<HistoryData />} />

                        <Route path="/Export" element={<Export />} />

                        <Route path="/FileUpload" element={<FileUpload />} />

                        <Route path="/Modelling" element={<Modelling />} />

                        <Route path="/ModelData" element={<ModelData />} />

                        <Route path="/User" element={<User />} />

                        <Route path="/TransferSystem" element={<TransferSystem />} />

                        <Route path="/Transfer" element={<Transfer />} />

                        <Route path="/TransferUpload" element={<TransferUpload />} />



                    </Routes>
                </Content>

                <footer className="h-36 " style={{
                    backgroundColor: "#3c3c3c",
                }} >
                    <div className="flex justify-center w-full">
                        <div className="flex items-center">
                            <img src={logoWhite} alt="logo" className="w-24  ml-10 mt-5" />

                        </div>

                    </div>
                </footer>
            </Layout>
        </Layout>

    );
}

export default BasicLayout;