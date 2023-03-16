import React, { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { SimulationData } from '../../models';
import ReactEcharts from 'echarts-for-react';
import './Export.css';

const Export = () => {
  const [data, setData] = useState([]);
  const [isDataSaved, setIsDataSaved] = useState(false);

  const handleSaveClick = async () => {
    const simulationData = {
      id: '6f39df0e-a367-42ea-9439-024c53e66a01',
      date: ['2022-03-18', '2022-03-19'],
      queued: [10, 20],
      resolved: [5, 10],
      new: [10, 15],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      const createdData = await DataStore.save(new SimulationData(simulationData));
      console.log('Created Data:', createdData);
      setIsDataSaved(true);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const handleQueryClick = async () => {
    try {
      const models = await DataStore.query(SimulationData);
      console.log('Fetched Data:', models);
      setData(models);
    //   await DataStore.clear()
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const bandChart = {
    title: {
        text: 'Distribution of Band in Applications',
    },
    tooltip: {},
    xAxis: {
        data: data.map((item) => item.date).flat(),
    },
    yAxis: {},
    series: [
        {
            name: '',
            type: 'bar',
            data: data.map((item) => item.resolved).flat(),
            color: '#2f7ed8' // Set color to blue
        },
    ],
};

  return (
    <div>
      <h1>Test</h1>
      {/* <button className="submit-button" onClick={handleSaveClick} disabled={isDataSaved}>
        Save Data
      </button> */}
      <button className="submit-button" onClick={handleQueryClick}>Fetch Data</button>
      <div>
        {data.length === 0 ? (
          <p>Data is empty</p>
        ) : (
          data.map((item) => (
            <div key={item.id}>
              <h2>ID: {item.id}</h2>
              <h2>Date: {item.date.join(', ')}</h2>
              <h2>Resolved: {item.resolved.join(', ')}</h2>
            </div>
          ))
        )}
      </div>
      <ReactEcharts option={bandChart}/>
    </div>
  );
}
  

export default Export;
