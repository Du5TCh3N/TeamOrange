import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerMyData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MyData, 'id'>;
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

type LazyMyData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MyData, 'id'>;
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

export declare type MyData = LazyLoading extends LazyLoadingDisabled ? EagerMyData : LazyMyData

export declare const MyData: (new (init: ModelInit<MyData>) => MyData) & {
  copyOf(source: MyData, mutator: (draft: MutableModel<MyData>) => MutableModel<MyData> | void): MyData;
}