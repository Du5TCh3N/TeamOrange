import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import AWS from 'aws-sdk';
import { DataStore } from 'aws-amplify';

const TransferUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [expectedHeaders, setExpectedHeaders] = useState([]);
  const [bedrooms, setBedrooms] = useState([30, 30, 30, 30, 30]);

  const handleUpload = (file) => {
    setUploading(true);
    process.env.AWS_SDK_LOAD_CONFIG = 1;
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });

    DataStore.clear();
  
    const fileName = file.name;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const contents = event.target.result;
      const csvArray = contents.split('\n');
      const headers = csvArray[0].trim().split(';'); // get the headers from the first row of the CSV file
      const curExpectedHeaders = ["FlatID", "Bedroom", "OccupierID", "Living Cost", "Satisfied", "ExpectedSpace", "TransferCost", "TransferRefund"];
      console.log("ExpectedHeaders", curExpectedHeaders);
      console.log("0", headers[0]===curExpectedHeaders[0]);  
      console.log("1", headers[1]===curExpectedHeaders[1]);
      console.log("2",typeof(headers[2]), typeof(curExpectedHeaders), headers[2], curExpectedHeaders[2], headers[2]===curExpectedHeaders[2]);
      console.log("3", headers[3]===curExpectedHeaders[3]);
      console.log("3", headers[4]===curExpectedHeaders[4]);
      console.log("4", headers[5]===curExpectedHeaders[5]);
      console.log("5", headers[6]===curExpectedHeaders[6]);
      console.log("6", headers[7]===curExpectedHeaders[7]);
      console.log("7", headers[8]===curExpectedHeaders[8]);
      if ((!headers.every((header) => curExpectedHeaders.includes(header)) || headers.length !== curExpectedHeaders.length) && headers[2] === "OccupierID") {
        alert('File headers do not match expected headers.');
        setUploading(false);
        return;
      }
  
      const csvData = csvArray.slice(1).map((row) => row.split(';'));
      const jsonData = csvData.map((row) => ({
        FlatID: row[0],
        Bedroom: row[1],
        OccupierID: row[2],
        LivingCost: row[3],
        Satisfied: row[4],
        ExpectedSpace: row[5],
        TransferCost: row[6],
        TransferRefund: row[7],
      }));
      
      const uploadParams = {
        Bucket: 'process-transfer',
        Key: "input-payload.json",
        ContentType: file.type,
        Body: JSON.stringify({
          data: jsonData,
          bedrooms: bedrooms,
        }),
      };
      console.log("UPLOAD PARAMS: ", uploadParams["Body"]);
      s3.upload(uploadParams, (err, data) => {
        if (err) {
          console.log(err);
          setUploading(false);
        } else {
          console.log(data);
          setUploading(false);
          alert('File uploaded successfully');
        }
      });
    };
    reader.readAsText(file);
  };
  

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return; // no file selected, so do nothing
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const contents = event.target.result;
      const csvArray = contents.split('\n');
      const csvData = csvArray.map((row) => row.split(';'));
      setExpectedHeaders(csvData[0]);
    };
    reader.readAsText(file);
  };

  const handleBedroomChange = (index, value) => {
    const newBedrooms = [...bedrooms];
    newBedrooms[index] = parseInt(value);
    setBedrooms(newBedrooms);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #ccc', padding: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
        <label htmlFor="bedroom1">1 Bedroom:</label>
        <input type="number" id="bedroom1" name="bedroom1" style={{ border: '1px solid #ccc', padding: '5px', width: '100px' }} value={bedrooms[0]} onChange={(event) => handleBedroomChange(0, event.target.value)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
        <label htmlFor="bedroom2">2 Bedrooms:</label>
        <input type="number" id="bedroom2" name="bedroom2" style={{ border: '1px solid #ccc', padding: '5px', width: '100px' }} value={bedrooms[1]} onChange={(event) => handleBedroomChange(1, event.target.value)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
        <label htmlFor="bedroom3">3 Bedrooms:</label>
        <input type="number" id="bedroom3" name="bedroom3" style={{ border: '1px solid #ccc', padding: '5px', width: '100px' }} value={bedrooms[2]} onChange={(event) => handleBedroomChange(2, event.target.value)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
        <label htmlFor="bedroom4">4 Bedrooms:</label>
        <input type="number" id="bedroom4" name="bedroom4" style={{ border: '1px solid #ccc', padding: '5px', width: '100px' }} value={bedrooms[3]} onChange={(event) => handleBedroomChange(3, event.target.value)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
        <label htmlFor="bedroom5">5 Bedrooms:</label>
        <input type="number" id="bedroom5" name="bedroom5" style={{ border: '1px solid #ccc', padding: '5px', width: '100px' }} value={bedrooms[4]} onChange={(event) => handleBedroomChange(4, event.target.value)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px' }}>
        <input type="file" accept=".csv" onChange={handleFileSelect} />
<<<<<<< HEAD
        <button onClick={(event) => handleUpload(event.target.previousSibling.files[0])} style={{ border: '1px solid #ccc', padding: '5px' }}>
=======
        <button className="submit-button" onClick={(event) => handleUpload(event.target.previousSibling.files[0])} style={{ border: '1px solid #ccc', padding: '5px' }}>
>>>>>>> 374465b27dfc6a43ebf7716df20b67cae23bc5fa
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );}
export default TransferUpload;
