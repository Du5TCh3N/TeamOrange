/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SimulationData } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SimulationDataUpdateFormInputValues = {
    date?: string[];
    queued?: number[];
    resolved?: number[];
    new?: number[];
};
export declare type SimulationDataUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    queued?: ValidationFunction<number>;
    resolved?: ValidationFunction<number>;
    new?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SimulationDataUpdateFormOverridesProps = {
    SimulationDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    queued?: PrimitiveOverrideProps<TextFieldProps>;
    resolved?: PrimitiveOverrideProps<TextFieldProps>;
    new?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SimulationDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: SimulationDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    simulationData?: SimulationData;
    onSubmit?: (fields: SimulationDataUpdateFormInputValues) => SimulationDataUpdateFormInputValues;
    onSuccess?: (fields: SimulationDataUpdateFormInputValues) => void;
    onError?: (fields: SimulationDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SimulationDataUpdateFormInputValues) => SimulationDataUpdateFormInputValues;
    onValidate?: SimulationDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SimulationDataUpdateForm(props: SimulationDataUpdateFormProps): React.ReactElement;
