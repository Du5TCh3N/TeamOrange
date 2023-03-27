/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Barchart } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BarchartUpdateFormInputValues = {
    name?: string[];
    value?: number[];
};
export declare type BarchartUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    value?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BarchartUpdateFormOverridesProps = {
    BarchartUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BarchartUpdateFormProps = React.PropsWithChildren<{
    overrides?: BarchartUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    barchart?: Barchart;
    onSubmit?: (fields: BarchartUpdateFormInputValues) => BarchartUpdateFormInputValues;
    onSuccess?: (fields: BarchartUpdateFormInputValues) => void;
    onError?: (fields: BarchartUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BarchartUpdateFormInputValues) => BarchartUpdateFormInputValues;
    onValidate?: BarchartUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BarchartUpdateForm(props: BarchartUpdateFormProps): React.ReactElement;
