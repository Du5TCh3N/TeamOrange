import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import AWS from 'aws-sdk';

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
 /* const [chartOption, setChartOption] = useState({
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
*/
  const handleUpload = (file) => {
    setUploading(true);
    process.env.AWS_SDK_LOAD_CONFIG = 1;
    const s3 = new AWS.S3({
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: "teset",//process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: "test",//process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });
  
    const fileName = file.name;
  
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
     /* setChartOption({
        ...chartOption,
        series: [
          {
            ...chartOption.series[0],
            data: chartData,
          },
        ],
      });*/
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

export default FileUpload;