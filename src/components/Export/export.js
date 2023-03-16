import React, { Component , useState, useEffect} from 'react';
import ReactEcharts from 'echarts-for-react';
import { DataStore } from '@aws-amplify/datastore';
import { SimulationData } from '../../models';

const Export = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{
      async function fetchData() {
        const models = await DataStore.query(SimulationData);
        console.log(models);  
        setData(models);
      }
      fetchData();
    }, []);

    return (
        <view>
          <div>Hello</div>
          <div>
            {data.map((item) => (
              <div key={item.id}>
                <h2>{item.date}</h2>
                <p>{item.new}</p>
              </div>
            ))}
          </div>
        </view>
      );

}

export default Export;
