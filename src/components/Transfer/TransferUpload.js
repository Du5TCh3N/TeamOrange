import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import AWS from 'aws-sdk';

// per chart

const TransferUpload = () => {
    const [uploading, setUploading] = useState(false);

  const handleUpload = (file) => {
    setUploading(true);
    process.env.AWS_SDK_LOAD_CONFIG = 1;
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });
  
    const fileName = file.name;
  
    const uploadParams = {
      Bucket: 'process-transfer',
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
      const chartData = csvData.map((row) => ({
        value: Number(row[1]),
        name: row[0],
      }));

      handleUpload(file); // pass the selected file to handleUpload
    };
    reader.readAsText(file);
  };
  

  return (
    <div>
     
      <input type="file" accept=".csv" onChange={handleFileSelect} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default TransferUpload;
