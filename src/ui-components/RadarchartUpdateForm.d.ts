/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Radarchart } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RadarchartUpdateFormInputValues = {
    Total?: number[];
    Value?: number[];
};
export declare type RadarchartUpdateFormValidationValues = {
    Total?: ValidationFunction<number>;
    Value?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RadarchartUpdateFormOverridesProps = {
    RadarchartUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Total?: PrimitiveOverrideProps<TextFieldProps>;
    Value?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RadarchartUpdateFormProps = React.PropsWithChildren<{
    overrides?: RadarchartUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    radarchart?: Radarchart;
    onSubmit?: (fields: RadarchartUpdateFormInputValues) => RadarchartUpdateFormInputValues;
    onSuccess?: (fields: RadarchartUpdateFormInputValues) => void;
    onError?: (fields: RadarchartUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RadarchartUpdateFormInputValues) => RadarchartUpdateFormInputValues;
    onValidate?: RadarchartUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RadarchartUpdateForm(props: RadarchartUpdateFormProps): React.ReactElement;
