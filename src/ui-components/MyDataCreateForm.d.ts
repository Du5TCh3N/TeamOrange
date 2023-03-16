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
export declare type MyDataCreateFormInputValues = {
    date?: string[];
    queued?: number[];
    resolved?: number[];
    new?: number[];
};
export declare type MyDataCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    queued?: ValidationFunction<number>;
    resolved?: ValidationFunction<number>;
    new?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MyDataCreateFormOverridesProps = {
    MyDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    queued?: PrimitiveOverrideProps<TextFieldProps>;
    resolved?: PrimitiveOverrideProps<TextFieldProps>;
    new?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MyDataCreateFormProps = React.PropsWithChildren<{
    overrides?: MyDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MyDataCreateFormInputValues) => MyDataCreateFormInputValues;
    onSuccess?: (fields: MyDataCreateFormInputValues) => void;
    onError?: (fields: MyDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MyDataCreateFormInputValues) => MyDataCreateFormInputValues;
    onValidate?: MyDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function MyDataCreateForm(props: MyDataCreateFormProps): React.ReactElement;
