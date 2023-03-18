import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {Card, Col, Row } from 'antd';

const Home = () => {


    const avatarUrl = "logo.png"

    return (
        <> <Row gutter={[16,16]}>
            <Col span={8}>
                <Card title="Home" bordered={false}>
                    Home page
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Histroy" bordered={false}>
                    Histroical data (2014-) 
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Model allocation" bordered={false}>
                    Allocation Policy Analysis
                </Card>

            </Col>
            <Col span={8}>
                <Card title="Load data" bordered={false}>
                    Upload CSV data
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Transfer" bordered={false}>
                    Transfer System
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Forecast" bordered={false}>
                    Foreast Platform
                </Card>

            </Col>

        </Row>
        

        </>
    );

}

export default Home;
