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
export declare type PivotTableCreateFormInputValues = {
    Bedroom1?: number[];
    Bedroom2?: number[];
    Bedroom3?: number[];
    Bedroom4?: number[];
    Bedroom5?: number[];
    Summary?: string[];
};
export declare type PivotTableCreateFormValidationValues = {
    Bedroom1?: ValidationFunction<number>;
    Bedroom2?: ValidationFunction<number>;
    Bedroom3?: ValidationFunction<number>;
    Bedroom4?: ValidationFunction<number>;
    Bedroom5?: ValidationFunction<number>;
    Summary?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PivotTableCreateFormOverridesProps = {
    PivotTableCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Bedroom1?: PrimitiveOverrideProps<TextFieldProps>;
    Bedroom2?: PrimitiveOverrideProps<TextFieldProps>;
    Bedroom3?: PrimitiveOverrideProps<TextFieldProps>;
    Bedroom4?: PrimitiveOverrideProps<TextFieldProps>;
    Bedroom5?: PrimitiveOverrideProps<TextFieldProps>;
    Summary?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PivotTableCreateFormProps = React.PropsWithChildren<{
    overrides?: PivotTableCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PivotTableCreateFormInputValues) => PivotTableCreateFormInputValues;
    onSuccess?: (fields: PivotTableCreateFormInputValues) => void;
    onError?: (fields: PivotTableCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PivotTableCreateFormInputValues) => PivotTableCreateFormInputValues;
    onValidate?: PivotTableCreateFormValidationValues;
} & React.CSSProperties>;
export default function PivotTableCreateForm(props: PivotTableCreateFormProps): React.ReactElement;
