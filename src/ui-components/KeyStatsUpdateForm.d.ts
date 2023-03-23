/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { KeyStats } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type KeyStatsUpdateFormInputValues = {
    name?: string;
};
export declare type KeyStatsUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KeyStatsUpdateFormOverridesProps = {
    KeyStatsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type KeyStatsUpdateFormProps = React.PropsWithChildren<{
    overrides?: KeyStatsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    keyStats?: KeyStats;
    onSubmit?: (fields: KeyStatsUpdateFormInputValues) => KeyStatsUpdateFormInputValues;
    onSuccess?: (fields: KeyStatsUpdateFormInputValues) => void;
    onError?: (fields: KeyStatsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: KeyStatsUpdateFormInputValues) => KeyStatsUpdateFormInputValues;
    onValidate?: KeyStatsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function KeyStatsUpdateForm(props: KeyStatsUpdateFormProps): React.ReactElement;
