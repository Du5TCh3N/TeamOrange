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
export declare type RadarchartCreateFormInputValues = {
    Total?: number[];
    Value?: number[];
};
export declare type RadarchartCreateFormValidationValues = {
    Total?: ValidationFunction<number>;
    Value?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RadarchartCreateFormOverridesProps = {
    RadarchartCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
    Value?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RadarchartCreateFormProps = React.PropsWithChildren<{
    overrides?: RadarchartCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RadarchartCreateFormInputValues) => RadarchartCreateFormInputValues;
    onSuccess?: (fields: RadarchartCreateFormInputValues) => void;
    onError?: (fields: RadarchartCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RadarchartCreateFormInputValues) => RadarchartCreateFormInputValues;
    onValidate?: RadarchartCreateFormValidationValues;
} & React.CSSProperties>;
export default function RadarchartCreateForm(props: RadarchartCreateFormProps): React.ReactElement;
