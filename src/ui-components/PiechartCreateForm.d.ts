/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PiechartCreateFormInputValues = {
    name?: string;
};
export declare type PiechartCreateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PiechartCreateFormOverridesProps = {
    PiechartCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type PiechartCreateFormProps = React.PropsWithChildren<{
    overrides?: PiechartCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PiechartCreateFormInputValues) => PiechartCreateFormInputValues;
    onSuccess?: (fields: PiechartCreateFormInputValues) => void;
    onError?: (fields: PiechartCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PiechartCreateFormInputValues) => PiechartCreateFormInputValues;
    onValidate?: PiechartCreateFormValidationValues;
} & React.CSSProperties>;
export default function PiechartCreateForm(props: PiechartCreateFormProps): React.ReactElement;
