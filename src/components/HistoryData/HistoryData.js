import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';

const HistoryAnalysis = () => {
   
    return (
        <> <Row gutter={[16,16]}>

            <Col span={8}>
                <Card title="Policy" bordered={false}>
                    Card content
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Data" bordered={false}>
                    Card content
                </Card>
            </Col>

            <Col span={8}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>

            </Col>


            <Col span={8}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>


            <Col span={8}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>


            <Col span={8}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>

            </Col>

        </Row>
        

        </>
    )

}

export default HistoryAnalysis;
