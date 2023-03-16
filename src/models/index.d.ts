import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerDataPoint = {
  readonly date: string;
  readonly resolved: number;
  readonly queued: number;
  readonly new: number;
}

type LazyDataPoint = {
  readonly date: string;
  readonly resolved: number;
  readonly queued: number;
  readonly new: number;
}

export declare type DataPoint = LazyLoading extends LazyLoadingDisabled ? EagerDataPoint : LazyDataPoint

export declare const DataPoint: (new (init: ModelInit<DataPoint>) => DataPoint)

