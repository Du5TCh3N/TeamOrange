import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import AWS from 'aws-sdk';

const ModelUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [expectedHeaders, setExpectedHeaders] = useState([]);

  const handleUpload = (file) => {
    console.log("Test?????")
    setUploading(true);
    process.env.AWS_SDK_LOAD_CONFIG = 1;
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });
  
    const fileName = file.name;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const contents = event.target.result;
      const csvArray = contents.split('\n');
      console.log("csvArray", csvArray[0]);
      const headers = csvArray[0].trim().split(';'); // get the headers from the first row of the CSV file
      console.log("HEADERSSSS", headers);
      
      // check if the headers match the expected headers
      const expectedHeaders = ['ApplicationId', 'AppCategory', 'AppMob', 'Band', 'BandStartDate', 'Bedroom'];
      if (!headers.every((header) => expectedHeaders.includes(header)) || headers.length != expectedHeaders.length) {
        alert('File headers do not match expected headers.');
        setUploading(false);
        return;
      }
  
      const uploadParams = {
        Bucket: 'rbkcsv',
        Key: fileName,
        ContentType: file.type,
        Body: file,
      };
  
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
      const csvData = csvArray.map((row) => row.split(','));
      setExpectedHeaders(csvData[0]);

      const chartData = csvData.map((row) => ({
        value: Number(row[1]),
        name: row[0],
      }));

      handleUpload(file); // pass the selected file to handleUpload
    };
    reader.readAsText(file);
  };

  const headersMatchExpected = (headers) => {
    const expectedHeaders = ['ApplicationId', 'AppCategory', 'AppMob', 'Band', 'BandStartDate', 'Bedroom'];
    //console.log("headers: ", headers);
    //console.log(headers.every((header, index) => header === expectedHeaders[index]));
    if (headers.length != expectedHeaders.length){
      console.log("FALSEEEEEE");
      return false;
    }
    return headers.every((header, index) => header === expectedHeaders[index]);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileSelect} />
      <button onClick={handleUpload} disabled={uploading || !headersMatchExpected(expectedHeaders)}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default ModelUpload;