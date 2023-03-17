import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

// Todo data support
const Modelling = () => {
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
  
  
    return (
        <>
            <ReactEcharts option={option}/>
            <ReactEcharts option={option2}/>

        </>
    );
}

export default Modelling;

