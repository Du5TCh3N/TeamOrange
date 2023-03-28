import React, { Component, useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { Table } from 'antd';
import { DataStore } from "@aws-amplify/datastore";
import { PivotTable } from '../../models';

const TransferData = () => {

    const [beforeTransferBedroomData, setBeforeTransferBedroomData] = useState({
      "Bedroom1": [300,70,46,3,1],
      "Bedroom2": [32,618,88,36,5],
      "Bedroom3": [74,21,395,9,2],
      "Bedroom4": [1,2,2,641],
      "Bedroom5": [1,1,3,2,23]
    });
    const [afterTransferBedroomData, setAfterTransferBedroomData] = useState({
      "Bedroom1": [500,70,46,3,1],
      "Bedroom2": [32,618,88,36,5],
      "Bedroom3": [74,21,395,9,2],
      "Bedroom4": [1,2,2,641],
      "Bedroom5": [1,1,3,2,23]
    });
    const [cost, setCost] = useState({
      "Bedroom1": [500,70,46,3,1],
      "Bedroom2": [32,618,88,36,5],
      "Bedroom3": [74,21,395,9,2],
      "Bedroom4": [1,2,2,641],
      "Bedroom5": [1,1,3,2,23]
    });

    const [totalCost, setTotalCost] = useState({
      "Total Cost": "£1,630,000"
    })

    useEffect(() => {
      async function fetchData() {
        const beforeTransferTableQuery = await DataStore.query(PivotTable, "BeforeTransfer");
        const beforeTransferBedroomData = {};

        // extract the values for each bedroom and load them into the bedroomData object
        Object.keys(beforeTransferTableQuery).forEach(key => {
          if (key.startsWith('Bedroom')) {
            beforeTransferBedroomData[key] = beforeTransferTableQuery[key];
          }
        });

        setBeforeTransferBedroomData(beforeTransferBedroomData);
        console.log(beforeTransferBedroomData);

        const afterTransferTableQuery = await DataStore.query(PivotTable, "AfterTransfer");
        const afterTransferBedroomData = {};

        // extract the values for each bedroom and load them into the bedroomData object
        Object.keys(afterTransferTableQuery).forEach(key => {
          if (key.startsWith('Bedroom')) {
            afterTransferBedroomData[key] = afterTransferTableQuery[key];
          }
        });

        setAfterTransferBedroomData(afterTransferBedroomData);

        const CostTableQuery = await DataStore.query(PivotTable, "Cost");
        const cost = {};

        // extract the values for each bedroom and load them into the bedroomData object
        Object.keys(CostTableQuery).forEach(key => {
          if (key.startsWith('Bedroom')) {
            cost[key] = CostTableQuery[key];
          }
        });

        setCost(cost);
      }
      fetchData();
    }, []);
    
    const BeforeTransferDataSource = [
        {
        FlatID: 'Bedroom 1',
        Bedroom: beforeTransferBedroomData["Bedroom1"][0],
        OccupierID: beforeTransferBedroomData["Bedroom1"][1],
        LivingCost: beforeTransferBedroomData["Bedroom1"][2],
        Satisfied: beforeTransferBedroomData["Bedroom1"][3],
        ExpectedSpace: beforeTransferBedroomData["Bedroom1"][4],
        TransferCost: beforeTransferBedroomData['Bedroom1'].reduce((acc, curr) => acc + curr, 0),
        TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 2',
            Bedroom: beforeTransferBedroomData["Bedroom2"][0],
            OccupierID: beforeTransferBedroomData["Bedroom2"][1],
            LivingCost: beforeTransferBedroomData["Bedroom2"][2],
            Satisfied: beforeTransferBedroomData["Bedroom2"][3],
            ExpectedSpace: beforeTransferBedroomData["Bedroom2"][4],
            TransferCost: beforeTransferBedroomData['Bedroom2'].reduce((acc, curr) => acc + curr, 0),
            TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 3',
            Bedroom: beforeTransferBedroomData["Bedroom3"][0],
            OccupierID: beforeTransferBedroomData["Bedroom3"][1],
            LivingCost: beforeTransferBedroomData["Bedroom3"][2],
            Satisfied: beforeTransferBedroomData["Bedroom3"][3],
            ExpectedSpace: beforeTransferBedroomData["Bedroom3"][4],
            TransferCost: beforeTransferBedroomData['Bedroom3'].reduce((acc, curr) => acc + curr, 0),
            TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 4',
            Bedroom: beforeTransferBedroomData["Bedroom4"][0],
            OccupierID: beforeTransferBedroomData["Bedroom4"][1],
            LivingCost: beforeTransferBedroomData["Bedroom4"][2],
            Satisfied: beforeTransferBedroomData["Bedroom4"][3],
            ExpectedSpace: beforeTransferBedroomData["Bedroom4"][4],
            TransferCost: beforeTransferBedroomData['Bedroom4'].reduce((acc, curr) => acc + curr, 0),
            TransferRefund: '1',
        },
        {
            FlatID: 'Bedroom 5',
            Bedroom: beforeTransferBedroomData["Bedroom5"][0],
            OccupierID: beforeTransferBedroomData["Bedroom5"][1],
            LivingCost: beforeTransferBedroomData["Bedroom5"][2],
            Satisfied: beforeTransferBedroomData["Bedroom5"][3],
            ExpectedSpace: beforeTransferBedroomData["Bedroom5"][4],
            TransferCost: beforeTransferBedroomData['Bedroom5'].reduce((acc, curr) => acc + curr, 0),
            TransferRefund: '1',
        },
      ];
      
      const BeforeTransferColumns = [
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

      const AfterTransferDataSource = [
        {
          FlatID: 'Bedroom 1',
          Bedroom: afterTransferBedroomData["Bedroom1"][0],
          OccupierID: afterTransferBedroomData["Bedroom1"][1],
          LivingCost: afterTransferBedroomData["Bedroom1"][2],
          Satisfied: afterTransferBedroomData["Bedroom1"][3],
          ExpectedSpace: afterTransferBedroomData["Bedroom1"][4],
          TransferCost: afterTransferBedroomData['Bedroom1'].reduce((acc, curr) => acc + curr, 0),
          TransferRefund: '1',
          },
          {
              FlatID: 'Bedroom 2',
              Bedroom: afterTransferBedroomData["Bedroom2"][0],
              OccupierID: afterTransferBedroomData["Bedroom2"][1],
              LivingCost: afterTransferBedroomData["Bedroom2"][2],
              Satisfied: afterTransferBedroomData["Bedroom2"][3],
              ExpectedSpace: afterTransferBedroomData["Bedroom2"][4],
              TransferCost: afterTransferBedroomData['Bedroom2'].reduce((acc, curr) => acc + curr, 0),
              TransferRefund: '1',
          },
          {
              FlatID: 'Bedroom 3',
              Bedroom: afterTransferBedroomData["Bedroom3"][0],
              OccupierID: afterTransferBedroomData["Bedroom3"][1],
              LivingCost: afterTransferBedroomData["Bedroom3"][2],
              Satisfied: afterTransferBedroomData["Bedroom3"][3],
              ExpectedSpace: afterTransferBedroomData["Bedroom3"][4],
              TransferCost: afterTransferBedroomData['Bedroom3'].reduce((acc, curr) => acc + curr, 0),
              TransferRefund: '1',
          },
          {
              FlatID: 'Bedroom 4',
              Bedroom: afterTransferBedroomData["Bedroom4"][0],
              OccupierID: afterTransferBedroomData["Bedroom4"][1],
              LivingCost: afterTransferBedroomData["Bedroom4"][2],
              Satisfied: afterTransferBedroomData["Bedroom4"][3],
              ExpectedSpace: afterTransferBedroomData["Bedroom4"][4],
              TransferCost: afterTransferBedroomData['Bedroom4'].reduce((acc, curr) => acc + curr, 0),
              TransferRefund: '1',
          },
          {
              FlatID: 'Bedroom 5',
              Bedroom: afterTransferBedroomData["Bedroom5"][0],
              OccupierID: afterTransferBedroomData["Bedroom5"][1],
              LivingCost: afterTransferBedroomData["Bedroom5"][2],
              Satisfied: afterTransferBedroomData["Bedroom5"][3],
              ExpectedSpace: afterTransferBedroomData["Bedroom5"][4],
              TransferCost: afterTransferBedroomData['Bedroom5'].reduce((acc, curr) => acc + curr, 0),
              TransferRefund: '1',
          },
      ];
      
      const AfterTransferColumns = [
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

      const BeforeTransfertitleComponent = <h1>{"Before Transfer Datasheet"}</h1>;
      const AfterTransfertitleComponent = <h1>{"After Transfer Datasheet"}</h1>;

    return (
        <div>

            <Row gutter={[16,16]}>

            <Col span={24}>
                <Card title="Save Cost" bordered={false}>
                  {totalCost["Total Cost"]}
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
            
            <Table dataSource={BeforeTransferDataSource} columns={BeforeTransferColumns} title={() => BeforeTransfertitleComponent} pagination={{ hideOnSinglePage: true }}/>
            <br></br>
            <br></br>
            <Table dataSource={AfterTransferDataSource} columns={AfterTransferColumns} title={() => AfterTransfertitleComponent} pagination={{ hideOnSinglePage: true }}/>
        </div>
    );
}

export default TransferData;
