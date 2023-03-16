/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMyData = /* GraphQL */ `
  query GetMyData($id: ID!) {
    getMyData(id: $id) {
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
export const listMyData = /* GraphQL */ `
  query ListMyData(
    $filter: ModelMyDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMyData(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const syncMyData = /* GraphQL */ `
  query SyncMyData(
    $filter: ModelMyDataFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMyData(
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
