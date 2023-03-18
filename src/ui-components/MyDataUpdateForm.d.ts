/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { MyData } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MyDataUpdateFormInputValues = {
    date?: string[];
    queued?: number[];
    resolved?: number[];
    new?: number[];
};
export declare type MyDataUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    queued?: ValidationFunction<number>;
    resolved?: ValidationFunction<number>;
    new?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MyDataUpdateFormOverridesProps = {
    MyDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    queued?: PrimitiveOverrideProps<TextFieldProps>;
    resolved?: PrimitiveOverrideProps<TextFieldProps>;
    new?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MyDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: MyDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    myData?: MyData;
    onSubmit?: (fields: MyDataUpdateFormInputValues) => MyDataUpdateFormInputValues;
    onSuccess?: (fields: MyDataUpdateFormInputValues) => void;
    onError?: (fields: MyDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MyDataUpdateFormInputValues) => MyDataUpdateFormInputValues;
    onValidate?: MyDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MyDataUpdateForm(props: MyDataUpdateFormProps): React.ReactElement;
