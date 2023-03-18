/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSimulationData = /* GraphQL */ `
  query GetSimulationData($id: ID!) {
    getSimulationData(id: $id) {
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
export const listSimulationData = /* GraphQL */ `
  query ListSimulationData(
    $filter: ModelSimulationDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSimulationData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSimulationData = /* GraphQL */ `
  query SyncSimulationData(
    $filter: ModelSimulationDataFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSimulationData(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
