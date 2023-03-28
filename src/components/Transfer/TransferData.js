import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { Table } from 'antd';

const TransferData = () => {

    const defaultTitle =  'Here is title';
    
    const dataSource = [
        {
        FlatID: 'Bedroom 1',
        Bedroom: '500',
        OccupierID: '70',
        LivingCost: '46',
        Satisfied: '3',
        ExpectedSpace: '1',
        TransferCost: '620',
        TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 2',
            Bedroom: '32',
            OccupierID: '618',
            LivingCost: '88',
            Satisfied: '36',
            ExpectedSpace: '5',
            TransferCost: '779',
            TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 3',
            Bedroom: '74',
            OccupierID: '21',
            LivingCost: '395',
            Satisfied: '9',
            ExpectedSpace: '2',
            TransferCost: '501',
            TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 4',
            Bedroom: '1',
            OccupierID: '2',
            LivingCost: '2',
            Satisfied: '64',
            ExpectedSpace: '1',
            TransferCost: '70',
            TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 5',
            Bedroom: '1',
            OccupierID: '1',
            LivingCost: '3',
            Satisfied: '2',
            ExpectedSpace: '23',
            TransferCost: '30',
            TransferRefund: '1',
        },
      ];
      
      const columns = [
        {
            title: 'Current Living Bedroom Size',
            dataIndex: 'FlatID',
            key: 'FlatID',
            align: 'center',
        },
        {
            title: 'Expected Bedroom 1',
            dataIndex: 'Bedroom',
            key: 'Bedroom',
            align: 'center',
        },
        {
            title: 'Expected Bedroom 2',
            dataIndex: 'OccupierID',
            key: 'OccupierID',
            align: 'center',
        },
        {
            title: 'Expected Bedroom 3',
            dataIndex: 'LivingCost',
            key: 'LivingCost',
            align: 'center',
        },
        {
            title: 'Expected Bedroom 4',
            dataIndex: 'Satisfied',
            key: 'Satisfied',
            align: 'center',
        },
        {
            title: 'Expected Bedroom 5',
            dataIndex: 'ExpectedSpace',
            key: 'ExpectedSpace',
            align: 'center',
        },
        {
          title: 'Total number',
          dataIndex: 'TransferCost',
          key: 'TransferCost',
          align: 'center',
        },
        
      ];
      

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

      const dataSource2 = [
        {
        FlatID: 'Bedroom 1',
        Bedroom: '500',
        OccupierID: '70',
        LivingCost: '46',
        Satisfied: '3',
        ExpectedSpace: '1',
        TransferCost: '620',
        TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 2',
            Bedroom: '32',
            OccupierID: '618',
            LivingCost: '88',
            Satisfied: '36',
            ExpectedSpace: '5',
            TransferCost: '779',
            TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 3',
            Bedroom: '74',
            OccupierID: '21',
            LivingCost: '395',
            Satisfied: '9',
            ExpectedSpace: '2',
            TransferCost: '501',
            TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 4',
            Bedroom: '1',
            OccupierID: '2',
            LivingCost: '2',
            Satisfied: '64',
            ExpectedSpace: '1',
            TransferCost: '70',
            TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 5',
            Bedroom: '1',
            OccupierID: '1',
            LivingCost: '3',
            Satisfied: '2',
            ExpectedSpace: '23',
            TransferCost: '30',
            TransferRefund: '1',
        },
      ];
      
      const columns2 = [
        {
            title: 'Current Living Bedroom Size',
            dataIndex: 'FlatID',
            key: 'FlatID',
            align: 'center',
        },
        {
            title: 'Expected Bedroom 1',
            dataIndex: 'Bedroom',
            key: 'Bedroom',
            align: 'center',
        },
        {
            title: 'Expected Bedroom 2',
            dataIndex: 'OccupierID',
            key: 'OccupierID',
            align: 'center',
        },
        {
            title: 'Expected Bedroom 3',
            dataIndex: 'LivingCost',
            key: 'LivingCost',
            align: 'center',
        },
        {
            title: 'Expected Bedroom 4',
            dataIndex: 'Satisfied',
            key: 'Satisfied',
            align: 'center',
        },
        {
            title: 'Expected Bedroom 5',
            dataIndex: 'ExpectedSpace',
            key: 'ExpectedSpace',
            align: 'center',
        },
        {
          title: 'Total number',
          dataIndex: 'TransferCost',
          key: 'TransferCost',
          align: 'center',
        },

      ];

    return (
        <div>

            <Row gutter={[16,16]}>

            <Col span={24}>
                <Card title="Save Cost" bordered={false}>
                    A
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Satisfaction" bordered={false}>
                    B
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Satisfaction" bordered={false}>
                    C
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Satisfaction" bordered={false}>
                    D
                </Card>
            </Col>

        </Row>
            <br></br>
            <br></br>
            <br></br>
            <h1>Before Transfer Datasheet</h1>
            <Table dataSource={dataSource} columns={columns} />
            <h1>After Transfer Datasheet</h1>
            <Table dataSource={dataSource2} columns={columns2} />
        </div>
    );
}

export default TransferData;
