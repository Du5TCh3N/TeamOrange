/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Piechart } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PiechartUpdateFormInputValues = {
    name?: string;
};
export declare type PiechartUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PiechartUpdateFormOverridesProps = {
    PiechartUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type PiechartUpdateFormProps = React.PropsWithChildren<{
    overrides?: PiechartUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    piechart?: Piechart;
    onSubmit?: (fields: PiechartUpdateFormInputValues) => PiechartUpdateFormInputValues;
    onSuccess?: (fields: PiechartUpdateFormInputValues) => void;
    onError?: (fields: PiechartUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PiechartUpdateFormInputValues) => PiechartUpdateFormInputValues;
    onValidate?: PiechartUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PiechartUpdateForm(props: PiechartUpdateFormProps): React.ReactElement;
