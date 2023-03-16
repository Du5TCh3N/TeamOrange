/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const saveDataPoints = /* GraphQL */ `
  mutation SaveDataPoints($dataPoints: [DataPointInput!]!) {
    saveDataPoints(dataPoints: $dataPoints) {
      date
      resolved
      queued
      new
    }
  }
`;
