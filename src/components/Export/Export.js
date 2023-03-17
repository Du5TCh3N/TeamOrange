import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';


// per chart

const Export = () => {


    const option1 = {
        title: {
            text: '',
        },
        tooltip: {},
        xAxis: {
            data: ['Band1', 'Band2', 'Band3', 'Band4', 'Ban5',]
        },
        yAxis: {},
        series: [
            {
                name: '',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20, 10],
            },
        ],
    };
    const avatarUrl = "logo.png"

    
    const option2 = {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: 'Direct Visit'
              },
              {
                value: 234,
                name: 'Union Ad'
              },
              {
                value: 1548,
                name: 'Search Engine'
              }
            ]
          }
        ]
      };

    return (
        <>
            <ReactEcharts option={option1}/>
            <ReactEcharts option={option2}/>

        </>
    );

}

export default Export;
