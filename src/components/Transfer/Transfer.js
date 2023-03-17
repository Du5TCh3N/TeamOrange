import React from 'react';
import { Table } from 'antd';
const Transfer = () => {
    const dataSource = [
        {
        ApplicationId: '1',
        Band: '2068435',
        Bedroom: 32,
        AppCategory: '西湖区湖底公园1号',
        Bedroom: 32,

        },
      ];
      
      const columns = [
        {
          title: 'ApplicationId',
          dataIndex: 'ApplicationId',
          key: 'ApplicationId',
        },
        {
          title: 'Band',
          dataIndex: 'Band',
          key: 'Band',
        },
        {
          title: 'Bedroom',
          dataIndex: 'Bedroom',
          key: 'Bedroom',
        },
        {
            title: 'AppCategory',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'AppMob',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'BandStartDate',
            dataIndex: 'address',
            key: 'address',
        },
      ];
      
    return (
        <div>
            <h1>Transfer</h1>
      <Table dataSource={dataSource} columns={columns} />

        </div>
    );
}
// todo https://ant.design/components/table-cn
export default Transfer;
