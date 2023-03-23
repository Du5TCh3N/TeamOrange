// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { KeyStats, Piechart, SimulationData } = initSchema(schema);

export {
  KeyStats,
  Piechart,
  SimulationData
};