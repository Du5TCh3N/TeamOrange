import React, { Component, useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { DataStore } from "@aws-amplify/datastore";
import { Barchart } from '../../models';

// Todo data support
const Model = () => {
    const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Profit', 'Expenses', 'Income']
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],

        series: [
          {
            name: 'Profit',
            type: 'bar',
            label: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              focus: 'series'
            },
            data: [200, 170, 240, 244, 200, 220, 210,200, 170, 240, 244, 200, 220, 210,200, 170, 240, 244, 200, 220, 210,200, 170, 240, 244, 200, 220, 210,200, 170, 240, 244, 200, 220, 210,200, 170, 240, 244, 200, 220, 210]
          },

          {
            name: 'Income',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 341, 374, 390, 450, 420,320, 302, 341, 374, 390, 450, 420,320, 302, 341, 374, 390, 450, 420,320, 302, 341, 374, 390, 450, 420,320, 302, 341, 374, 390, 450, 420,320, 302, 341, 374, 390, 450, 420]
          },

          {
            name: 'Expenses',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'left'
            },
            emphasis: {
              focus: 'series'
            },
            data: [-120, -132, -101, -134, -190, -230, -210,-120, -132, -101, -134, -190, -230, -210,-120, -132, -101, -134, -190, -230, -210,-120, -132, -101, -134, -190, -230, -210,-120, -132, -101, -134, -190, -230, -210,-120, -132, -101, -134, -190, -230, -210]
          }
        ]
      };

       // define the radar chart options
  const option2 = {
    title: {
      text: 'Radar Chart Example'
    },
    tooltip: {},
    legend: {
      data: ['Sales', 'Expenses']
    },
    radar: {
      indicator: [
        { name: 'Marketing', max: 100 },
        { name: 'Sales', max: 100 },
        { name: 'Development', max: 100 },
        { name: 'Customer Support', max: 100 },
        { name: 'Administration', max: 100 }
      ]
    },
    series: [{
      name: 'Budget vs spending',
      type: 'radar',
      data : [
        {
          value : [90, 80, 85, 75, 70],
          name : 'Sales'
        },
        {
          value : [70, 90, 80, 85, 80],
          name : 'Expenses'
        }
      ]
    }]
  };
    // define the scatter chart options

    const [bandChartData, setBandChartData] = useState([
      { name: 'Band 1', value: 400 },
      { name: 'Band 2', value: 400 },
      { name: 'Band 3', value: 955 },
      { name: 'Band 4', value: 1377 },
      { name: 'Band 5', value: 205 },
    ]);
    
    const bandChart = {
      title: {
        text: 'Distribution of Band in Applications',
      },
      tooltip: {},
      xAxis: {
        data: bandChartData.map((data) => data.name),
      },
      yAxis: {},
      series: [
        {
          name: '',
          type: 'bar',
          data: bandChartData.map((data) => ({
            value: data.value,
            itemStyle: { color: '#2f7ed8' },
          })),
        },
      ],
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
        },
      },
    };
    
  
    const [bedroomChartData, setBedroomChartData] = useState([
      { name: '1 Bed', value: 1020 },
      { name: '2 Bed', value: 988 },
      { name: '3 Bed', value: 853 },
      { name: '4 Bed', value: 245 },
      { name: '5 Bed', value: 39 },
      { name: '6 Bed', value: 4 },
      { name: '7 Bed', value: 1 },
    ]);
    
    const bedroomChart = {
      title: {
        text: 'Distribution of Bedroom in Applications',
      },
      tooltip: {},
      xAxis: {
        data: bedroomChartData.map((data) => data.name),
      },
      yAxis: {},
      series: [
        {
          name: '',
          type: 'bar',
          data: bedroomChartData.map((data) => ({
            value: data.value,
            itemStyle: { color: '#8bbc21' },
          })),
        },
      ],
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
        },
      },
    };
  
    const [yearChartData, setYearChartData] = useState([
      { name: '1995', value: 1 },
      { name: '1996', value: 19 },
      { name: '1997', value: 9 },
      { name: '1998', value: 11 },
      { name: '1999', value: 9 },
      { name: '2000', value: 12 },
      { name: '2001', value: 11 },
      { name: '2002', value: 12 },
      { name: '2003', value: 19 },
      { name: '2004', value: 24 },
      { name: '2005', value: 20 },
      { name: '2006', value: 31 },
      { name: '2007', value: 30 },
      { name: '2008', value: 39 },
      { name: '2009', value: 38 },
      { name: '2010', value: 40 },
      { name: '2011', value: 38 },
      { name: '2012', value: 52 },
      { name: '2013', value: 90 },
      { name: '2014', value: 131 },
      { name: '2015', value: 206 },
      { name: '2016', value: 263 },
      { name: '2017', value: 390 },
      { name: '2018', value: 310 },
      { name: '2019', value: 309 },
      { name: '2020', value: 410 },
      { name: '2021', value: 384 },
      { name: '2022', value: 248 },
    ]);

    const yearChart = {
      title: {
        text: 'Distribution of Applications over the Years',
      },
      tooltip: {},
      xAxis: {
        data: yearChartData.map((data) => data.name),
      },
      yAxis: {},
      series: [
        {
          name: '',
          type: 'bar',
          data: yearChartData.map((data) => ({
            value: data.value,
            itemStyle: { color: '#910000' },
          })),
        },
      ],
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
        },
      },
    };
    
    useEffect(() => {
      async function fetchData() {
        // await DataStore.clear();
        const bandBarchartData = await DataStore.query(Barchart, "band_barchart");
        const bedroomBarchartData = await DataStore.query(Barchart, "bedroom_barchart");
        const yearBarchartData = await DataStore.query(Barchart, "year_barchart");
        
        const bandData = bandBarchartData.value.map((value, index) => ({
          name: bandBarchartData.name[index],
          value
        }));
        console.log("Band: ", bandData)
        setBandChartData(bandData);
        
        console.log("Bedroom: ", bedroomBarchartData)
        const bedData = bedroomBarchartData.value.map((value, index) => ({
          name: bedroomBarchartData.name[index],
          value
        }));
        setBedroomChartData(bedData);
        
        console.log("Year: ", yearBarchartData)
        const yearData = yearBarchartData.value.map((value, index) => ({
          name: yearBarchartData.name[index],
          value
        }));
        setYearChartData(yearData);
      }
      fetchData();
    }, []);
  
  
    return (
        <>
            <ReactEcharts option={option}/>
            <ReactEcharts option={option2}/>
            <div style={{ display: 'inline-block', width: '33%' }}>
              <ReactEcharts option={bandChart}/>
            </div>
            <div style={{ display: 'inline-block', width: '33%' }}>
              <ReactEcharts option={bedroomChart}/>
            </div>
            <div style={{ display: 'inline-block', width: '33%' }}>
              <ReactEcharts option={yearChart}/>
            </div>
            
        </>
    );
}

export default Model;

