/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMyData = /* GraphQL */ `
  mutation CreateMyData(
    $input: CreateMyDataInput!
    $condition: ModelMyDataConditionInput
  ) {
    createMyData(input: $input, condition: $condition) {
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
export const updateMyData = /* GraphQL */ `
  mutation UpdateMyData(
    $input: UpdateMyDataInput!
    $condition: ModelMyDataConditionInput
  ) {
    updateMyData(input: $input, condition: $condition) {
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
export const deleteMyData = /* GraphQL */ `
  mutation DeleteMyData(
    $input: DeleteMyDataInput!
    $condition: ModelMyDataConditionInput
  ) {
    deleteMyData(input: $input, condition: $condition) {
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
