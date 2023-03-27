/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { PivotTable } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PivotTableUpdateFormInputValues = {
    Bedroom1?: number[];
    Bedroom2?: number[];
    Bedroom3?: number[];
    Bedroom4plus?: number[];
};
export declare type PivotTableUpdateFormValidationValues = {
    Bedroom1?: ValidationFunction<number>;
    Bedroom2?: ValidationFunction<number>;
    Bedroom3?: ValidationFunction<number>;
    Bedroom4plus?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PivotTableUpdateFormOverridesProps = {
    PivotTableUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Bedroom1?: PrimitiveOverrideProps<TextFieldProps>;
    Bedroom2?: PrimitiveOverrideProps<TextFieldProps>;
    Bedroom3?: PrimitiveOverrideProps<TextFieldProps>;
    Bedroom4plus?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PivotTableUpdateFormProps = React.PropsWithChildren<{
    overrides?: PivotTableUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    pivotTable?: PivotTable;
    onSubmit?: (fields: PivotTableUpdateFormInputValues) => PivotTableUpdateFormInputValues;
    onSuccess?: (fields: PivotTableUpdateFormInputValues) => void;
    onError?: (fields: PivotTableUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PivotTableUpdateFormInputValues) => PivotTableUpdateFormInputValues;
    onValidate?: PivotTableUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PivotTableUpdateForm(props: PivotTableUpdateFormProps): React.ReactElement;
