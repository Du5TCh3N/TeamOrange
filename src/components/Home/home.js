import React, { Component,useState } from 'react';
import { Layout, Space, Card, Col, Row,Modal } from 'antd';

const Home = () => {


  return (

    
        <Row gutter={[16,16]}>

        <Col span={24}>
          <Card title="Data Visualisation Platform for Social Housing " bordered={false}style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(230,255,251,)', border: 0 }}>
          </Card>
        </Col>

        <Col span={8}>
          <Card  bordered={false}style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(230,255,251,)', border: 0 }}>
          </Card>
        </Col>


        <Col span={8}>
          <Card title=" " bordered={false}style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(230,255,251,)', border: 0 }}>
          </Card>
        </Col>


        <Col span={8}>
          <Card title=" " bordered={false}style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(230,255,251,)', border: 0 }}>
          </Card>
        </Col>
        </Row>

  )
}

export default Home;

