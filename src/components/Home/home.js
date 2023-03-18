import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {Card, Col, Row } from 'antd';

const Home = () => {

    const bandChart = {
        title: {
            text: 'Distribution of Band in Applications',
        },
        tooltip: {},
        xAxis: {
            data: ['Band 1', 'Band 2', 'Band 3', 'Band 4', 'Band 5',]
        },
        yAxis: {},
        series: [
            {
                name: '',
                type: 'bar',
                data: [238, 378, 955, 1377, 205],
                color: '#2f7ed8' // Set color to blue
            },
        ],
    };
    
    const bedroomChart = {
        title: {
            text: 'Distribution of Bedroom in Applications',
        },
        tooltip: {},
        xAxis: {
            data: ['1 Bed', '2 Bed', '3 Bed', '4 Bed', '5 Bed', '6 Bed', '7 Bed']
        },
        yAxis: {},
        series: [
            {
                name: '',
                type: 'bar',
                data: [1020, 988, 853, 245, 39, 4, 1],
                color: '#8bbc21' // Set color to green
            },
        ],
    };
    
    const yearChart = {
        title: {
            text: 'Distribution of Applications over the Years',
        },
        tooltip: {},
        xAxis: {
            data: [
                '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002',
                '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018',
                '2019', '2020', '2021', '2022'
            ]
        },
        yAxis: {},
        series: [
            {
                name: '',
                type: 'bar',
                data: [
                    1, 19, 9, 11, 9, 12, 11, 12, 19, 24, 20, 31, 30, 39, 38, 40,
                    38, 52, 90, 131, 206, 263, 390, 310, 309, 410, 384, 248
                ],
                color: '#910000' // Set color to red
            },
        ],
    };
    
    


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
                    Allocation analysis
                </Card>

            </Col>
            <Col span={8}>
                <Card title="Load data" bordered={false}>
                    Upload CSV data
                </Card>
            </Col>
            <Col span={8}>
                <Card title="transfer" bordered={false}>
                    transfer system
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Foreaste" bordered={false}>
                    Foreast platform
                </Card>

            </Col>

        </Row>
        

        </>
    );

}

export default Home;
