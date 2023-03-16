// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DataPoint } = initSchema(schema);

export {
  DataPoint
};