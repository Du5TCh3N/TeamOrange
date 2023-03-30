import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import ReactEcharts from 'echarts-for-react';

const Datavisualisation = () => {

    const option1 = {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 392,
                name: 'One bed'
              },
              {
                value: 258,
                name: 'Two bed'
              },
              {
                value: 219,
                name: 'Three bed'
              },
              {
                value: 52,
                name: 'Four bed'
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
                value: 141,
                name: 'One bed'
              },
              {
                value: 197,
                name: 'Two bed'
              },
              {
                value: 346,
                name: 'Three bed'
              },
              {
                value: 127,
                name: 'Four bed'
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
                value: 57,
                name: 'One bed'
              },
              {
                value: 83,
                name: 'Two bed'
              },
              {
                value: 51,
                name: 'Three bed'
              },
              {
                value: 11,
                name: 'Four bed'
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
                value: 66,
                name: 'One bed'
              },
              {
                value: 81,
                name: 'Two bed'
              },
              {
                value: 41,
                name: 'Three bed'
              },
              {
                value: 8,
                name: 'Four bed'
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
                value: 70,
                name: 'One bed'
              },
              {
                value: 56,
                name: 'Two bed'
              },
              {
                value: 25,
                name: 'Three bed'
              },
              {
                value: 5,
                name: 'Four bed'
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
                value: 64,
                name: 'One bed'
              },
              {
                value: 68,
                name: 'Two bed'
              },
              {
                value: 26,
                name: 'Three bed'
              },
              {
                value: 1,
                name: 'Four bed'
              }
            ]
          }
        ]
        
      };

    return (
        <> <Row gutter={[16,16]}>

            <Col span={12}>
                <Card title="First time application(2022)" bordered={false} style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(255,242,232, 0.4)', border: 0 }} >
                    <ReactEcharts option={option1}/>  
                </Card>
            </Col>

            <Col span={12}>
                <Card title="Transfer target(2022)" bordered={false} style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(255,242,232, 0.4)', border: 0 }}>
                <ReactEcharts option={option2}/>  
                </Card>
            </Col>

            <Col span={12}>
                <Card title="Data 2016" bordered={false} style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(255,242,232, 0.4)', border: 0 }}>
                <ReactEcharts option={option3}/>  
                </Card>

            </Col>

            <Col span={12}>
                <Card title="Data 2017" bordered={false} style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(255,242,232, 0.4)', border: 0 }}>
                <ReactEcharts option={option4}/>  
                </Card>
            </Col>

            <Col span={12}>
                <Card title="Data 2018" bordered={false} style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(255,242,232, 0.4)', border: 0 }}>
                <ReactEcharts option={option5}/>  
                </Card>
            </Col>

            <Col span={12}>
                <Card title="Data 2019" bordered={false} style={{backgroundColor: 'rgba(255,242,232, 0.0)', border: 0 }} headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }} bodyStyle={{backgroundColor: 'rgba(255,242,232, 0.4)', border: 0 }}>
                <ReactEcharts option={option6}/>  
                </Card>

            </Col>
        </Row>
        </>
    )

}

export default Datavisualisation;
