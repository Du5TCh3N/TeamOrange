// Importing required modules and styles
import React, { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { SimulationData, Piechart } from '../../models';
import './Export.css';

const Export = () => {
  // Initializing states
  const [data, setData] = useState([]);
  const [isDataSaved, setIsDataSaved] = useState(false);

  // Function to handle saving data
  const handleSaveClick = async () => {
    // Data to be saved
    const simulationData = {
      id: '6f39df0e-a367-42ea-9439-024c53e66a01',
      date: ['2022-03-18', '2022-03-19'],
      queued: [-10, -20],
      resolved: [5, 10],
      new: [10, 15],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      // Saving the data to the DataStore
      const createdData = await DataStore.save(new SimulationData(simulationData));
      console.log('Created Data:', createdData);
      // Updating the state to indicate that data has been saved
      setIsDataSaved(true);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  // Function to handle querying data
  const handleQueryClick = async () => {
    try {
      // Querying the DataStore for data
      const models = await DataStore.query(Piechart);
      console.log('Fetched Data:', models);
      // Updating the state to store the fetched data
      setData(models);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  // Function to handle clearing data
  const handleClearClick = async () => {
    try {
    // Clearing the data from the DataStore
      await DataStore.clear(SimulationData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  // Render the component
  return (
    <div>
      {/* Heading */}
      <h1>Test</h1>
      {/* Button to save data */}
      <button className="submit-button" onClick={handleSaveClick} disabled={isDataSaved}>
        Save Data
      </button>
      {/* Button to fetch data */}
      <button className="submit-button" onClick={handleQueryClick}>Fetch Data</button>
      {/* Button to clear data */}
      <button className="submit-button" onClick={handleClearClick}>Clear Data</button>
      {/* Displaying the fetched data */}
      <div>
        {data.length === 0 ? (
          <p>Data is empty</p>
          ) : (
          data.map((item) => (
            <div key={item.id}>
              <h1>ID: {item.id}</h1>
              <h2>Date: {item.category.join(', ')}</h2>
              <h2>Resolved: {item.resolved.join(', ')}</h2>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Exporting the component
export default Export;