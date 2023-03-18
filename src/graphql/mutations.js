/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSimulationData = /* GraphQL */ `
  mutation CreateSimulationData(
    $input: CreateSimulationDataInput!
    $condition: ModelSimulationDataConditionInput
  ) {
    createSimulationData(input: $input, condition: $condition) {
      id
      date
      queued
      resolved
      new
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSimulationData = /* GraphQL */ `
  mutation UpdateSimulationData(
    $input: UpdateSimulationDataInput!
    $condition: ModelSimulationDataConditionInput
  ) {
    updateSimulationData(input: $input, condition: $condition) {
      id
      date
      queued
      resolved
      new
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSimulationData = /* GraphQL */ `
  mutation DeleteSimulationData(
    $input: DeleteSimulationDataInput!
    $condition: ModelSimulationDataConditionInput
  ) {
    deleteSimulationData(input: $input, condition: $condition) {
      id
      date
      queued
      resolved
      new
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
