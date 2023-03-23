import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerKeyStats = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KeyStats, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyKeyStats = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KeyStats, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type KeyStats = LazyLoading extends LazyLoadingDisabled ? EagerKeyStats : LazyKeyStats

export declare const KeyStats: (new (init: ModelInit<KeyStats>) => KeyStats) & {
  copyOf(source: KeyStats, mutator: (draft: MutableModel<KeyStats>) => MutableModel<KeyStats> | void): KeyStats;
}

type EagerPiechart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Piechart, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly category?: (string | null)[] | null;
  readonly resolved?: (number | null)[] | null;
  readonly applications?: (number | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPiechart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Piechart, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly category?: (string | null)[] | null;
  readonly resolved?: (number | null)[] | null;
  readonly applications?: (number | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Piechart = LazyLoading extends LazyLoadingDisabled ? EagerPiechart : LazyPiechart

export declare const Piechart: (new (init: ModelInit<Piechart>) => Piechart) & {
  copyOf(source: Piechart, mutator: (draft: MutableModel<Piechart>) => MutableModel<Piechart> | void): Piechart;
}

type EagerSimulationData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SimulationData, 'id'>;
  };
  readonly id: string;
  readonly date: string[];
  readonly queued: number[];
  readonly resolved: number[];
  readonly new: number[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazySimulationData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SimulationData, 'id'>;
  };
  readonly id: string;
  readonly date: string[];
  readonly queued: number[];
  readonly resolved: number[];
  readonly new: number[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type SimulationData = LazyLoading extends LazyLoadingDisabled ? EagerSimulationData : LazySimulationData

export declare const SimulationData: (new (init: ModelInit<SimulationData>) => SimulationData) & {
  copyOf(source: SimulationData, mutator: (draft: MutableModel<SimulationData>) => MutableModel<SimulationData> | void): SimulationData;
}