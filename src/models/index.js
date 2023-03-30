// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PivotTable, Radarchart, Barchart, KeyStats, Piechart, SimulationData } = initSchema(schema);

export {
  PivotTable,
  Radarchart,
  Barchart,
  KeyStats,
  Piechart,
  SimulationData
};