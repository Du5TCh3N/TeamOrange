/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SimulationDataCreateFormInputValues = {
    date?: string[];
    queued?: number[];
    resolved?: number[];
    new?: number[];
    createdAt?: string;
    updatedAt?: string;
};
export declare type SimulationDataCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    queued?: ValidationFunction<number>;
    resolved?: ValidationFunction<number>;
    new?: ValidationFunction<number>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SimulationDataCreateFormOverridesProps = {
    SimulationDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    queued?: PrimitiveOverrideProps<TextFieldProps>;
    resolved?: PrimitiveOverrideProps<TextFieldProps>;
    new?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SimulationDataCreateFormProps = React.PropsWithChildren<{
    overrides?: SimulationDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SimulationDataCreateFormInputValues) => SimulationDataCreateFormInputValues;
    onSuccess?: (fields: SimulationDataCreateFormInputValues) => void;
    onError?: (fields: SimulationDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SimulationDataCreateFormInputValues) => SimulationDataCreateFormInputValues;
    onValidate?: SimulationDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function SimulationDataCreateForm(props: SimulationDataCreateFormProps): React.ReactElement;
