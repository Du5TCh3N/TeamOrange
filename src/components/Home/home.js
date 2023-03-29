import React, { Component,useState } from 'react';
import { Layout, Space, Card, Col, Row,Modal } from 'antd';
import logpic from "../../assets/logo.png"
import Home1 from "../../assets/Home1.jpg"
import Home2 from "../../assets/Home2.png"
import Home3 from "../../assets/Home3.jpg"
import Home4 from "../../assets/Home4.png"
const Home = () => {


  return (

    
        <Row gutter={[16,16]}>

        <Col span={24}>
          <Card title="Data Visualisation Platform for Social Housing " bordered={false}style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(230,255,251,)', border: 0 }}>
          <img src = {Home1} style ={{
            width: 2300 ,
            height: 800}}></img> 
            <br></br> <p>This platform is focusing on improving the quality of allocation choice for social housing, increasing the speed of analysing CSV file and rising the efficiency for our user. Eventually, we can save cost for our users. </p>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Library" bordered={false}style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(230,255,251,)', border: 0 }}>
          <img src = {Home2} style ={{
            width: 300 ,
            height: 300}}></img>
          </Card>
        </Col>


        <Col span={8}>
          <Card title="Allocation" bordered={false}style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(230,255,251,)', border: 0 }}>
          <img src = {Home3} style ={{
            width: 300 ,
            height: 300}}></img>
          </Card>
        </Col>


        <Col span={8}>
          <Card title="Transfer" bordered={false}style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(230,255,251,)', border: 0 }}>
          <img src = {Home4} style ={{
            width: 300 ,
            height: 300}}></img>
          </Card>
        </Col>
        </Row>

  )
}

export default Home;

