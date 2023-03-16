// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SimulationData } = initSchema(schema);

export {
  SimulationData
};