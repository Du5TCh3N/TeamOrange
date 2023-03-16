import React  ,{ useState }from 'react';
import {Button, Avatar,Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {  Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Export from '../Export/export';
import FileUpload from '../FileUpload/fileUpload';
import Home from '../Home/home';
import Modelling from '../Modelling/modelling';
import User from '../User/user';

const {Header, Sider, Content} = Layout;
const BasicLayout = () => {
    const [collapsed,setCollapsed]=useState(false);
    const toggle=()=>{
      setCollapsed(!collapsed)
    
    }
   const avatarUrl = "assets/logo.png"
  

    return (
        <Layout style={{minHeight: '100vh'}}>
                <Sider className="text-white" trigger={null} collapsible collapsed={ collapsed}>

                    <h1 className="text-base font-bold underline text-white"
                        style={{display: collapsed ? 'none' : 'block'}}>
                        Data visualisation platform
                    </h1>
                    <div className="w-full mt-3">
                        <div className="flex items-center">
                            <Avatar className=" ml-3" size={48} src={avatarUrl}/>
                            <span className="ml-5"
                                  style={{display:  collapsed ? 'none' : 'block'}}>{"Kingston Councils"}</span>
                        </div>
                    </div>


                    <Menu className="mt-3" theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                        <Menu.Item key="1" icon={<UserOutlined/>}>
                            <Link to='/'>Home</Link>
                        </Menu.Item>

                        <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
                        <Link to='/modelling'>Model allocation</Link>
                        </Menu.Item>


                        <Menu.Item key = "3" icon= {<UploadOutlined/>}>
                            <Link to='/FileUpload'>Load data</Link>
                        </Menu.Item>

                        <Menu.Item key="4" icon={<UploadOutlined/>}>
                            <Link to='/Export'>Export</Link>
                        </Menu.Item>
                        
                    </Menu>

                </Sider>
                <Layout className="site-layout">
                    <Header className=" bg-amber-50 border-2" style={{backgroundColor: "#edeeeb"}}>
                        <div className="flex items-center" >
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: toggle,
                            })}
                            <span className="  ml-auto">
                                <Avatar className="mr-2" size={48} src={avatarUrl}/>
                                <span >
                                    <Link to='/User'>{"David Hill"}</Link>
                                </span>
                            </span>

                        </div>



                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                               <Routes>
                                    <Route path = "/" element = {<Home />} />

                                    <Route path = "/Export" element={<Export />} />

                                    <Route path = "/FileUpload" element = {<FileUpload />} />

                                    <Route path = "/Modelling" element = {<Modelling />} />

                                    <Route path = "/User" element = {<User />} />
                                    
                                </Routes>
                    </Content>
                </Layout>
            </Layout>
    );
}

export default BasicLayout;
