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
export declare type KeyStatsCreateFormInputValues = {
    name?: string;
};
export declare type KeyStatsCreateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KeyStatsCreateFormOverridesProps = {
    KeyStatsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type KeyStatsCreateFormProps = React.PropsWithChildren<{
    overrides?: KeyStatsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: KeyStatsCreateFormInputValues) => KeyStatsCreateFormInputValues;
    onSuccess?: (fields: KeyStatsCreateFormInputValues) => void;
    onError?: (fields: KeyStatsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: KeyStatsCreateFormInputValues) => KeyStatsCreateFormInputValues;
    onValidate?: KeyStatsCreateFormValidationValues;
} & React.CSSProperties>;
export default function KeyStatsCreateForm(props: KeyStatsCreateFormProps): React.ReactElement;
