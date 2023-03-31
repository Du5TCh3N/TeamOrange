import React, {useEffect, useState} from 'react';
import ReactEcharts from 'echarts-for-react';
import {DataStore} from "@aws-amplify/datastore";
import {Piechart, Radarchart, SimulationData} from '../../models';
import './Modelling.css'

import AWS from 'aws-sdk';

process.env.AWS_SDK_LOAD_CONFIG = 1;
const lambda = new AWS.Lambda({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  // region: process.env.REACT_APP_AWS_REGION,
  region: "eu-west-2",
  apiVersion: '2015-03-31',
});

function callLambdaFunction(payload) {
  const params = {
    FunctionName: 'python-modeller',
    Payload: JSON.stringify(payload)
  };

  lambda.invoke(params, function(err, data){
    if (err) {
      console.log("Error: ", err)
    } else {
      console.log("Data: ", data)
    }
  })
}

const policyDefaults = {
  "PanelMoves": 0.02,
  "Homeless": 0.04,
  "SocialServicesQuota": 0.04,
  "Transfer": 0.01,
  "HomeScheme": 0.04,
  "FirstTimeApplicants": 0.01,
  "TenantFinder": 0.01,
  "Downsizer": 0.02,
  "Decants": 0.8,
  "Other": 0.01
};

const policyLabelNames = {
  "PanelMoves": "Panel Moves",
  "Homeless": "Homeless",
  "SocialServicesQuota": "Social Services Quota",
  "Transfer": "Transfer",
  "HomeScheme": "Home Scheme",
  "FirstTimeApplicants": "First Time Applicants",
  "TenantFinder": "Tenant Finder",
  "Downsizer": "Downsizer",
  "Decants": "Decants",
  "Other": "Other"
};

const supplyDefaults = {
  "1": 58,
  "2": 53,
  "3": 29,
  "4": 2
};

const supplyLabelNames = {
  "1": "One Bedroom Properties",
  "2": "Two Bedroom Properties",
  "3": "Three Bedroom Properties",
  "4": "Four or More Bedroom Properties"
}

const dateDefaults = {
  "startDate": "2022-01-01",
  "endDate": "2022-12-31"
}

const dateLabelNames = {
  "startDate": "Starting Date",
  "endDate": "End Date"
}

const Modelling = () => {
  const [data, setData] = useState([]);
  const [categoryRadarChartData, setCategoryRadarChartData] = useState([
    {
      name: 'Applications',
      value: [100, 7, 11, 3, 5, 1, 100, 39, 11, 16],
    },
    {
      name: 'Resolved',
      value: [50, 2, 2, 2, 5, 1, 75, 20, 3, 4],
    },
    {
      name: 'Homless',
      max: 100,
    },
    {
      name: 'SocialServicesQuota',
      max: 20,
    },
    {
      name: 'Downsizer',
      max: 20,
    },
    {
      name: 'HomeScheme',
      max: 20,
    },
    {
      name: 'Decants',
      max: 20,
    },
    {
      name: 'PanelMoves',
      max: 20,
    },
    {
      name: 'FirstTimeApplicant',
      max: 100,
    },
    {
      name: 'Transfer',
      max: 50,
    },
    {
      name: 'TenantFinder',
      max: 20,
    },
    {
      name: 'Other',
      max: 20,
    },
  ]);
  const [categoryPieChartData, setCategoryPieChartData] = useState({
    'Homeless': 3,
    'SocialServicesQuota': 2,
    'Downsizer': 2,
    'HomeScheme': 2,
    'Decants': 5,
    'PanelMoves': 1
  });
  const [bandPieChartData, setBandPieChartData] = useState({
    'Band 1': 8,
    'Band 2': 4,
    'Band 3': 5
  });
  const [bedroomPieChartData, setBedroomPieChartData] = useState({
    '1 Bed': 7,
    '2 Bed': 7,
    '3 Bed': 2,
    '4 Bed': 1
  });

  useEffect(() => {
    async function fetchData() {
      const models = await DataStore.query(SimulationData, "LambdaSimulation");
      const data = models.date.map((date, index) => ({
        date,
        resolved: models.resolved[index],
        new: models.new[index],
        queued: models.queued[index],
      }));
      setData(data);
      console.log(models);

      const categoryPiechartData = await DataStore.query(Piechart, "category_piechart");
      const bandPiechartData = await DataStore.query(Piechart, "band_piechart");
      const bedroomPiechartData = await DataStore.query(Piechart, "bedroom_piechart");

      const categoryList = categoryPiechartData.category;
      const categoryResolvedList = categoryPiechartData.resolved;
      // Create a dictionary mapping each category to its corresponding resolved value
      const categoryResolvedDict = {};
      if (categoryList && categoryResolvedList && categoryList.length === categoryResolvedList.length) {
        for (let i = 0; i < categoryList.length; i++) {
          categoryResolvedDict[categoryList[i]] = categoryResolvedList[i];
        }
      }
      console.log(categoryResolvedDict)
      setCategoryPieChartData(categoryResolvedDict)

      const bandList = bandPiechartData.category;
      const bandResolvedList = bandPiechartData.resolved;

      // Create a dictionary mapping each category to its corresponding resolved value
      const bandResolvedDict = {};
      if (bandList && bandResolvedList && bandList.length === bandResolvedList.length) {
        for (let i = 0; i < bandList.length; i++) {
          bandResolvedDict[bandList[i]] = bandResolvedList[i];
        }
      };
      console.log(categoryResolvedDict)
      setBandPieChartData(bandResolvedDict)

      const bedroomList = bedroomPiechartData.category;
      const bedroomResolvedList = bedroomPiechartData.resolved;

      // Create a dictionary mapping each category to its corresponding resolved value
      const bedroomResolvedDict = {};
      if (bedroomList && bedroomResolvedList && bedroomList.length === bedroomResolvedList.length) {
        for (let i = 0; i < bedroomList.length; i++) {
          bedroomResolvedDict[bedroomList[i]] = bedroomResolvedList[i];
        }
      };
      console.log(bedroomResolvedDict)
      setBedroomPieChartData(bedroomResolvedDict);

      const categoryRadarchart = await DataStore.query(Radarchart, "CategoryComparisonRadarchart");
      console.log(categoryRadarchart);

    }
    fetchData();
  }, []);

  const simulationChart = {
    title: {
      text: 'Simulation',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['New', 'Queued', 'Resolved'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        // data: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06', '2022-01-07', '2022-01-08', '2022-01-09', '2022-01-10', '2022-01-11', '2022-01-12', '2022-01-13', '2022-01-14', '2022-01-15', '2022-01-16', '2022-01-17', '2022-01-18', '2022-01-19', '2022-01-20', '2022-01-21']
        data: data.map((item) => item.date).flat()
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    dataZoom: {
      // id: 'dataZoomY',
      type: "slider",
      start: 0
    },

    series: [
      {
        name: 'New',
        type: 'bar',
        label: {
          show: false,
          position: 'inside'
        },
        emphasis: {
          focus: 'series'
        },
        // data: [200, 170, 240, 244, 200, 220, 210,200, 170, 240, 244, 200, 220, 210,200, 170, 240, 244, 200, 220, 210]
        data: data.map((item) => item.new).flat()
      },

      {
        name: 'Resolved',
        type: 'bar',
        stack: 'Total',
        label: {
          show: false
        },
        emphasis: {
          focus: 'series'
        },
        // data: [320, 302, 341, 374, 390, 450, 420,320, 302, 341, 374, 390, 450, 420,320, 302, 341, 374, 390, 450, 420]
        data: data.map((item) => item.resolved).flat()
      },

      {
        name: 'Queued',
        type: 'bar',
        stack: 'Total',
        label: {
          show: false,
          position: 'left'
        },
        emphasis: {
          focus: 'series'
        },
        // data: [-120, -132, -101, -134, -190, -230, -210,-120, -132, -101, -134, -190, -230, -210,-120, -132, -101, -134, -190, -230, -210,-120, -132, -101, -134, -190, -230, -210,-120, -132, -101, -134, -190, -230, -210,-120, -132, -101, -134, -190, -230, -210]
        data: data.map((item) => item.queued).flat()
      }
    ],
    toolbox: {
      show: true, 
      feature: {
        saveAsImage: {}
      }
    }
  };

  const applications = categoryRadarChartData.find(
    (data) => data.name === 'Applications'
  );
  const indicators = categoryRadarChartData.filter((data) =>
    Object.prototype.hasOwnProperty.call(data, 'max')
  );

  indicators.forEach((indicator) => {
    indicator.max = applications.value[indicators.indexOf(indicator)];
  });

  const radarChart = {
    title: {
      text: 'Comparison of Applications to Resolved',
      left: 'center'
    },
    tooltip: {},
    legend: {
      data: ['Applications', 'Resolved'],
      bottom: 0
    },
    radar: {
      indicator: indicators.map((indicator) => ({
        name: indicator.name, 
        max: indicator.max,
      }))
    },
    series: [{
      name: 'Budget vs spending',
      type: 'radar',
      data: categoryRadarChartData.map(({ name, value }) => ({ name, value })),
    }],
    toolbox: {
      show: true, 
      top: 30,
      feature: {
        saveAsImage: {},
      }
    }
  };
  const categoryPieChart = {
    title: {
      text: 'Resolved Applicants by Category',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: Object.keys(categoryPieChartData).map((key) => {
          return {
            value: categoryPieChartData[key],
            name: key
          }
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    toolbox: {
      show: true, 
      top: 30,
      feature: {
        saveAsImage: {}
      }
    }
  };

  const bandPieChart = {
    title: {
      text: 'Resolved Applicants by Band',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: Object.keys(bandPieChartData).map((key) => {
          return {
            value: bandPieChartData[key],
            name: key
          }
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    toolbox: {
      show: true, 
      top: 30,
      feature: {
        saveAsImage: {}
      }
    }
  };

  const bedroomPieChart = {
    title: {
      text: 'Resolved Applicants by Bedroom Size',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: Object.keys(bedroomPieChartData).map((key) => {
          return {
            value: bedroomPieChartData[key],
            name: key
          }
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    toolbox: {
      show: true, 
      top: 30,
      feature: {
        saveAsImage: {}
      }
    }
  };
  return (
    <view>
      <div style={{ display: 'block', width: '100%' }}>
        <ReactEcharts option={simulationChart} />
      </div>
      <div style={{ display: 'inline-block', width: '25%' }}>
        <ReactEcharts option={radarChart} />
      </div>
      <div style={{ display: 'inline-block', width: '25%' }}>
        <ReactEcharts option={categoryPieChart} />
      </div>
      <div style={{ display: 'inline-block', width: '25%' }}>
        <ReactEcharts option={bandPieChart} />
      </div>
      <div style={{ display: 'inline-block', width: '25%' }}>
        <ReactEcharts option={bedroomPieChart} />
      </div>
      <PolicyForm />
    </view>

  );
}

function PolicyForm() {
  const [policyInputs, setPolicyInputs] = useState(Object.entries(policyDefaults).map(([_, value]) => value));
  const [supplyInputs, setSupplyInputs] = useState(Object.entries(supplyDefaults).map(([_, value]) => value));
  const [dateInputs, setDateInputs] = useState(Object.entries(dateDefaults).map(([_, value]) => value));

  const handlePolicyInputChange = (index, value) => {
    const newPolicyInputs = [...policyInputs];
    newPolicyInputs[index] = parseFloat(value);
    setPolicyInputs(newPolicyInputs);
    const key = Object.keys(policyDefaults)[index];
    policyDefaults[key] = newPolicyInputs[index];
  };

  const handleSupplyInputChange = (key, value) => {
    const newSupplyInputs = { ...supplyInputs };
    newSupplyInputs[key] = parseInt(value);
    setSupplyInputs(newSupplyInputs);
    supplyDefaults[key] = newSupplyInputs[key];
  };


  const handleDateInputChange = (index, value) => {
    const newDateInputs = [...dateInputs];
    newDateInputs[index] = value;
    setDateInputs(newDateInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let outputObj = {
      "policy": {},
      "supply": {},
      "startDate": "",
      "endDate": ""
    };

    outputObj["policy"] = policyDefaults;
    outputObj["supply"] = supplyDefaults;

    outputObj["startDate"] = dateInputs[0];
    outputObj["endDate"] = dateInputs[1];

    const sum_of_inputs = policyInputs.reduce((a, b) => a + b, 0);

    if (sum_of_inputs >= 1) {
      // TODO: Add some sort of dialog to alert user that policy should be less than 100%
    } else {
      callLambdaFunction(outputObj);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-column">
        <h2>Application Policy Inputs</h2>
        {Object.entries(policyDefaults).map(([key, value], index) => (
          <div className="input-group" key={`policy-input-${key}-${index}`}>
            <label htmlFor={`policy-input-${key}-${index}`}>{policyLabelNames[key]}</label>
            <br />
            <input
              id={`policy-input-${key}-${index}`}
              className="range-input"
              type="range"
              step="0.01"
              max="1"
              min="0"
              name={`policy-input-${key}-${index}`}
              value={policyInputs[index] || value}
              onChange={(e) => handlePolicyInputChange(index, e.target.value)}
              style={{ width: "100px" }}
            />
            <br />
            <span className="range-value">{Math.round(policyInputs[index] * 100) || Math.round(value * 100)}%</span>
          </div>
        ))}
        <div className="input-group" key="total-policy">
          <label htmlFor="total-policy">Total Allocation</label>
          <br/>
          <input
            disabled="true"
            className="input-group"
            type="range"
            max="1"
            min="0"
            step={0.01}
            name="total-policy"
            value={policyInputs.reduce((a, b) => a + b, 0)}
            style={{ width: "100px" }}
           />
          <br/>
            <span className="range-value">{Math.round(policyInputs.reduce((a, b) => a + b, 0) * 100)}%</span>
        </div>
      </div>

      <div className="form-column">
        <h2>Property Supply Inputs</h2>
        {Object.entries(supplyDefaults).map(([key, value], index) => (
          <div className="input-group" key={`supply-input-${key}-${index}`}>
            <label htmlFor={`supply-input-${key}-${index}`}>{supplyLabelNames[key]}</label>
            <input
              id={`supply-input-${key}-${index}`}
              className="number-input"
              type="number"
              step="1"
              name={`supply-input-${key}-${index}`}
              value={supplyInputs[key] || value}
              onChange={(e) => handleSupplyInputChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="form-column">
        <h2>Date Inputs</h2>
        {Object.entries(dateDefaults).map(([key, value], index) => (
          <div className="input-group" key={`date-input-${key}-${index}`}>
            <label htmlFor={`date-input-${key}-${index}`}>{dateLabelNames[key]}</label>
            <input
              id={`date-input-${key}-${index}`}
              className="date-input"
              type="date"
              name={`date-input-${key}-${index}`}
              value={dateInputs[index] || value}
              onChange={(e) => handleDateInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="submit-container">
        <button className="submit-button" type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  );
}

export default Modelling;
