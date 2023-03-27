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
export declare type BarchartCreateFormInputValues = {
    name?: string[];
    value?: string[];
};
export declare type BarchartCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    value?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BarchartCreateFormOverridesProps = {
    BarchartCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BarchartCreateFormProps = React.PropsWithChildren<{
    overrides?: BarchartCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BarchartCreateFormInputValues) => BarchartCreateFormInputValues;
    onSuccess?: (fields: BarchartCreateFormInputValues) => void;
    onError?: (fields: BarchartCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BarchartCreateFormInputValues) => BarchartCreateFormInputValues;
    onValidate?: BarchartCreateFormValidationValues;
} & React.CSSProperties>;
export default function BarchartCreateForm(props: BarchartCreateFormProps): React.ReactElement;
