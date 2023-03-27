import React from 'react';
import { Table } from 'antd';

const TransferSystem = () => {
    const dataSource = [
        {
        FlatID: '1',
        Bedroom: '1',
        OccupierID: '1',
        LivingCost: '1',
        Satisfied: '1',
        ExpectedSpace: '1',
        TransferCost: '1',
        TransferRefund: '1',
        },
      ];
      
      const columns = [
        {
            title: 'FlatID',
            dataIndex: 'FlatID',
            key: 'FlatID',
            align: 'center',
        },
        {
            title: 'Bedroom',
            dataIndex: 'Bedroom',
            key: 'Bedroom',
            align: 'center',
        },
        {
            title: 'OccupierID',
            dataIndex: 'OccupierID',
            key: 'OccupierID',
            align: 'center',
        },
        {
            title: 'Living Cost',
            dataIndex: 'LivingCost',
            key: 'LivingCost',
            align: 'center',
        },
        {
            title: 'Satisfied',
            dataIndex: 'Satisfied',
            key: 'Satisfied',
            align: 'center',
        },
        {
            title: 'Expected Space',
            dataIndex: 'ExpectedSpace',
            key: 'ExpectedSpace',
            align: 'center',
        },
        {
          title: 'Transfer Cost',
          dataIndex: 'TransferCost',
          key: 'TransferCost',
          align: 'center',
        },
        {
        title: 'Transfer Refund',
        dataIndex: 'TransferRefund',
        key: 'TransferRefund',
        align: 'center',
        },
      ];
      






    // const option2 = {
    //   series: [
    //      {
    //        type: 'pie',
    //        data: [
    //         {
    //            value: 335,
    //            name: 'Direct Visit'
    //         },
    //          {
    //            value: 234,
    //           name: 'Union Ad'
    //         },
    //         {
    //           value: 1548,
    //           name: 'Search Engine'
    //         }
    //        ]
    //     }
    //   ]
    // };






    return (
        <div>
            <h1>Transfer</h1>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}












export default TransferSystem;
