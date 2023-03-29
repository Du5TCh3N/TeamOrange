import React, { useState } from 'react';
import { Avatar, Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    HistoryOutlined,
    TransactionOutlined,
    ContainerOutlined

} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserManuals from '../UserManuals/UserManuals';
import ModelAllocationManuals from '../UserManuals/ModelAllocationManuals';
import TransferManuals from '../UserManuals/TransferManuals';

import FileUpload from '../FileUpload/fileUpload';
import Home from '../Home/home';

import Model from '../Model/Model';
import Simulation from '../Model/Simulation';
import ModelUpload from '../Model/ModelUpload';

import User from '../User/user';

import Policy from '../HistoryAnalysis/Policy';
import Datavisualisation from '../HistoryAnalysis/Datavisualisation';

import TransferData from '../Transfer/TransferData'
import TransferSystem from '../Transfer/TransferSystem';
import TransferUpload  from '../Transfer/TransferUpload';

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

                    <SubMenu key="2" title="Library" icon={<HistoryOutlined />}>

                        <Menu.Item>  
                            { <Link to='/Policy'> Allocation Policy </Link> }
                        </Menu.Item>
     
                        <Menu.Item>
                           { <Link to='/Datavisualisation'>Historical Data</Link> }
                        </Menu.Item>

                    </SubMenu>

                    <SubMenu key="3" title="Model Allocation" icon={<VideoCameraOutlined />}>

                            <Menu.Item>   
                                { <Link to='/ModelUpload'>Upload CSV file</Link> }
                            </Menu.Item>

                            <Menu.Item>   
                                { <Link to='/Model'>Model Solution</Link> }
                            </Menu.Item>

                            <Menu.Item>   
                                { <Link to='/Simulation'>Simulation</Link> }
                            </Menu.Item>
         
                    </SubMenu>
                    <SubMenu key="5" title = "Transfer" icon={<TransactionOutlined />}>
                        
                        <Menu.Item>
                            { <Link to='/TransferUpload'> Upload CSV file</Link> }
                        </Menu.Item>

                        <Menu.Item>
                            {<Link to='/TransferSystem'>Transfer Result</Link>}
                        </Menu.Item>

                        <Menu.Item>
                            { <Link to='/TransferData'> Transfer Data</Link> }
                        </Menu.Item>

                    </SubMenu>

                    <SubMenu key="6" title = "UserManuals" icon={<ContainerOutlined />}>

                        <Menu.Item>
                            <Link to='/UserManuals'>User Manual</Link>
                        </Menu.Item>

                        <Menu.Item>
                            {<Link to='/ModelAllocationManuals'>Model Allocation</Link>}
                        </Menu.Item>

                        <Menu.Item>
                            {<Link to='/TransferManuals'>Transfer System</Link>}
                        </Menu.Item>
                    </SubMenu>



                </Menu>
            </Sider>

            <Layout className="site-layout">
                <Header className=" bg-amber-50 border-2" style={{ backgroundColor: "#edeeeb" }}>
                    <div className="flex items-center" >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                        <span className="ml-auto">
                            <Avatar className="mr-2" size={52} src={logo} />
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

                        <Route path="/Policy" element={<Policy />} />

                        <Route path="/Datavisualisation" element={<Datavisualisation />} />

                        <Route path="/UserManuals" element={<UserManuals />} />

                        <Route path="/FileUpload" element={<FileUpload />} />

                        <Route path="/Model" element={<Model />} />
                        <Route path="/ModelUpload" element={<ModelUpload />} />
                        <Route path="/Simulation" element={<Simulation />} />

                        <Route path="/User" element={<User />} />

                        <Route path="/TransferData" element={<TransferData />} />
                        <Route path="/TransferSystem" element={<TransferSystem />} />
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