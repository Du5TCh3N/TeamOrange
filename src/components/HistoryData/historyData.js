import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import ReactEcharts from 'echarts-for-react';

const HistoryData = () => {
   
    const option1 = {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 35,
                name: 'occupied'
              },
              {
                value: 23,
                name: 'unoccupied'
              },
              {
                value: 548,
                name: 'waiting'
              },
              {
                value: 548,
                name: 'waiting2'
              }
            ]
          }
        ]
      };
      const option2 = {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 33,
                name: 'Direct Visit'
              },
              {
                value: 234,
                name: 'Union Ad'
              },
              {
                value: 148,
                name: 'Search Engine'
              },
              {
                value: 548,
                name: 'waiting2'
              }
            ]
          }
        ]
      };    
      const option3 = {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: 'Direct Visit'
              },
              {
                value: 34,
                name: 'Union Ad'
              },
              {
                value: 154,
                name: 'Search Engine'
              },
              {
                value: 548,
                name: 'waiting2'
              }
            ]
          }
        ]
      };    
      const option4 = {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 35,
                name: 'Direct Visit'
              },
              {
                value: 234,
                name: 'Union Ad'
              },
              {
                value: 154,
                name: 'Search Engine'
              },
              {
                value: 548,
                name: 'waiting2'
              }
            ]
          }
        ]
      };    
      const option5 = {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: 'Direct Visit'
              },
              {
                value: 234,
                name: 'Union Ad'
              },
              {
                value: 158,
                name: 'Search Engine'
              },
              {
                value: 548,
                name: 'waiting2'
              }
            ]
          }
        ]
      };    
      const option6 = {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: 'Direct Visit'
              },
              {
                value: 234,
                name: 'Union Ad'
              },
              {
                value: 1548,
                name: 'Search Engine'
              },
              {
                value: 548,
                name: 'waiting2'
              }
            ]
          }
        ]
      };




    return (
        <> <Row gutter={[16,16]}>

            <Col span={8}>
                <Card title="Data 2014" bordered={false}>
                    <ReactEcharts option={option1}/>  
                </Card>
            </Col>

            <Col span={8}>
                <Card title="DataData 2015" bordered={false}>
                <ReactEcharts option={option2}/>  
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Data 2016" bordered={false}>
                <ReactEcharts option={option3}/>  
                </Card>

            </Col>


            <Col span={8}>
                <Card title="Data 2017" bordered={false}>
                <ReactEcharts option={option4}/>  
                </Card>
            </Col>


            <Col span={8}>
                <Card title="Data 2018" bordered={false}>
                <ReactEcharts option={option5}/>  
                </Card>
            </Col>


            <Col span={8}>
                <Card title="Data 2019" bordered={false}>
                <ReactEcharts option={option6}/>  
                </Card>

            </Col>

        </Row>
        

        </>
    )

}

export default HistoryData;
