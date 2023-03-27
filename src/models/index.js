// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Radarchart, Barchart, KeyStats, Piechart, SimulationData } = initSchema(schema);

export {
  Radarchart,
  Barchart,
  KeyStats,
  Piechart,
  SimulationData
};