import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import ReactEcharts from 'echarts-for-react';

const HistoryAnalysis = () => {
   

    const option3 = {
        title: {
          text: 'Stacked Line'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };





    return (
        
        <> 
        
              
        
        <Row gutter={[16,16]}>

            <Col span={8}>
                <Card title="A" bordered={false}>
                    A
                </Card>
            </Col>

            <Col span={8}>
                <Card title="B" bordered={false}>
                    B
                </Card>
            </Col>

            <Col span={8}>
                <Card title="C" bordered={false}>
                    C
                </Card>

            </Col>


            <Col span={8}>
                <Card title="D" bordered={false}>
                    D
                </Card>
            </Col>


            <Col span={8}>
                <Card title="E" bordered={false}>
                    E
                </Card>
            </Col>


            <Col span={8}>
                <Card title="F" bordered={false}>
                    F
                </Card>

            </Col>

            <ReactEcharts option={option3}/> 
        </Row>
        
        </>
    )

}

export default HistoryAnalysis;