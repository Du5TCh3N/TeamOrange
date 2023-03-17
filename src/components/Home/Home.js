import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
const Home = () => {
   
    // const option1 = {
    //     title: {
    //         text: '',
    //     },
    //     tooltip: {},
    //     xAxis: {
    //         data: ['Band1', 'Band2', 'Band3', 'Band4', 'Ban5',]
    //     },
    //     yAxis: {},
    //     series: [
    //         {
    //             name: '',
    //             type: 'bar',
    //             data: [5, 20, 36, 10, 10, 20, 10],
    //         },
    //     ],
    // };
    // const avatarUrl = "logo.png"


    // const option2 = {
    //     series: [
    //       {
    //         type: 'pie',
    //         data: [
    //           {
    //             value: 335,
    //             name: 'Direct Visit'
    //           },
    //           {
    //             value: 234,
    //             name: 'Union Ad'
    //           },
    //           {
    //             value: 1548,
    //             name: 'Search Engine'
    //           }
    //         ]
    //       }
    //     ]
    //   };

    // return (
    //     <>
    //         <ReactEcharts option={option1}/>
    //         <ReactEcharts option={option2}/>

    //     </>
    // );
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
    )



}

export default Home;
