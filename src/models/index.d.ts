import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerSimulationData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SimulationData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string[];
  readonly queued: number[];
  readonly resolved: number[];
  readonly new: number[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySimulationData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SimulationData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string[];
  readonly queued: number[];
  readonly resolved: number[];
  readonly new: number[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SimulationData = LazyLoading extends LazyLoadingDisabled ? EagerSimulationData : LazySimulationData

export declare const SimulationData: (new (init: ModelInit<SimulationData>) => SimulationData) & {
  copyOf(source: SimulationData, mutator: (draft: MutableModel<SimulationData>) => MutableModel<SimulationData> | void): SimulationData;
}