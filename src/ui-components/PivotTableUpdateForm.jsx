/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { PivotTable } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function PivotTableUpdateForm(props) {
  const {
    id: idProp,
    pivotTable,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Bedroom1: [],
    Bedroom2: [],
    Bedroom3: [],
    Bedroom4plus: [],
  };
  const [Bedroom1, setBedroom1] = React.useState(initialValues.Bedroom1);
  const [Bedroom2, setBedroom2] = React.useState(initialValues.Bedroom2);
  const [Bedroom3, setBedroom3] = React.useState(initialValues.Bedroom3);
  const [Bedroom4plus, setBedroom4plus] = React.useState(
    initialValues.Bedroom4plus
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = pivotTableRecord
      ? { ...initialValues, ...pivotTableRecord }
      : initialValues;
    setBedroom1(cleanValues.Bedroom1 ?? []);
    setCurrentBedroom1Value("");
    setBedroom2(cleanValues.Bedroom2 ?? []);
    setCurrentBedroom2Value("");
    setBedroom3(cleanValues.Bedroom3 ?? []);
    setCurrentBedroom3Value("");
    setBedroom4plus(cleanValues.Bedroom4plus ?? []);
    setCurrentBedroom4plusValue("");
    setErrors({});
  };
  const [pivotTableRecord, setPivotTableRecord] = React.useState(pivotTable);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(PivotTable, idProp)
        : pivotTable;
      setPivotTableRecord(record);
    };
    queryData();
  }, [idProp, pivotTable]);
  React.useEffect(resetStateValues, [pivotTableRecord]);
  const [currentBedroom1Value, setCurrentBedroom1Value] = React.useState("");
  const Bedroom1Ref = React.createRef();
  const [currentBedroom2Value, setCurrentBedroom2Value] = React.useState("");
  const Bedroom2Ref = React.createRef();
  const [currentBedroom3Value, setCurrentBedroom3Value] = React.useState("");
  const Bedroom3Ref = React.createRef();
  const [currentBedroom4plusValue, setCurrentBedroom4plusValue] =
    React.useState("");
  const Bedroom4plusRef = React.createRef();
  const validations = {
    Bedroom1: [],
    Bedroom2: [],
    Bedroom3: [],
    Bedroom4plus: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Bedroom1,
          Bedroom2,
          Bedroom3,
          Bedroom4plus,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            PivotTable.copyOf(pivotTableRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "PivotTableUpdateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Bedroom1: values,
              Bedroom2,
              Bedroom3,
              Bedroom4plus,
            };
            const result = onChange(modelFields);
            values = result?.Bedroom1 ?? values;
          }
          setBedroom1(values);
          setCurrentBedroom1Value("");
        }}
        currentFieldValue={currentBedroom1Value}
        label={"Bedroom1"}
        items={Bedroom1}
        hasError={errors?.Bedroom1?.hasError}
        errorMessage={errors?.Bedroom1?.errorMessage}
        setFieldValue={setCurrentBedroom1Value}
        inputFieldRef={Bedroom1Ref}
        defaultFieldValue={""}
      >
        <TextField
          label="Bedroom1"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentBedroom1Value}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.Bedroom1?.hasError) {
              runValidationTasks("Bedroom1", value);
            }
            setCurrentBedroom1Value(value);
          }}
          onBlur={() => runValidationTasks("Bedroom1", currentBedroom1Value)}
          errorMessage={errors.Bedroom1?.errorMessage}
          hasError={errors.Bedroom1?.hasError}
          ref={Bedroom1Ref}
          labelHidden={true}
          {...getOverrideProps(overrides, "Bedroom1")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Bedroom1,
              Bedroom2: values,
              Bedroom3,
              Bedroom4plus,
            };
            const result = onChange(modelFields);
            values = result?.Bedroom2 ?? values;
          }
          setBedroom2(values);
          setCurrentBedroom2Value("");
        }}
        currentFieldValue={currentBedroom2Value}
        label={"Bedroom2"}
        items={Bedroom2}
        hasError={errors?.Bedroom2?.hasError}
        errorMessage={errors?.Bedroom2?.errorMessage}
        setFieldValue={setCurrentBedroom2Value}
        inputFieldRef={Bedroom2Ref}
        defaultFieldValue={""}
      >
        <TextField
          label="Bedroom2"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentBedroom2Value}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.Bedroom2?.hasError) {
              runValidationTasks("Bedroom2", value);
            }
            setCurrentBedroom2Value(value);
          }}
          onBlur={() => runValidationTasks("Bedroom2", currentBedroom2Value)}
          errorMessage={errors.Bedroom2?.errorMessage}
          hasError={errors.Bedroom2?.hasError}
          ref={Bedroom2Ref}
          labelHidden={true}
          {...getOverrideProps(overrides, "Bedroom2")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Bedroom1,
              Bedroom2,
              Bedroom3: values,
              Bedroom4plus,
            };
            const result = onChange(modelFields);
            values = result?.Bedroom3 ?? values;
          }
          setBedroom3(values);
          setCurrentBedroom3Value("");
        }}
        currentFieldValue={currentBedroom3Value}
        label={"Bedroom3"}
        items={Bedroom3}
        hasError={errors?.Bedroom3?.hasError}
        errorMessage={errors?.Bedroom3?.errorMessage}
        setFieldValue={setCurrentBedroom3Value}
        inputFieldRef={Bedroom3Ref}
        defaultFieldValue={""}
      >
        <TextField
          label="Bedroom3"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentBedroom3Value}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.Bedroom3?.hasError) {
              runValidationTasks("Bedroom3", value);
            }
            setCurrentBedroom3Value(value);
          }}
          onBlur={() => runValidationTasks("Bedroom3", currentBedroom3Value)}
          errorMessage={errors.Bedroom3?.errorMessage}
          hasError={errors.Bedroom3?.hasError}
          ref={Bedroom3Ref}
          labelHidden={true}
          {...getOverrideProps(overrides, "Bedroom3")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Bedroom1,
              Bedroom2,
              Bedroom3,
              Bedroom4plus: values,
            };
            const result = onChange(modelFields);
            values = result?.Bedroom4plus ?? values;
          }
          setBedroom4plus(values);
          setCurrentBedroom4plusValue("");
        }}
        currentFieldValue={currentBedroom4plusValue}
        label={"Bedroom4plus"}
        items={Bedroom4plus}
        hasError={errors?.Bedroom4plus?.hasError}
        errorMessage={errors?.Bedroom4plus?.errorMessage}
        setFieldValue={setCurrentBedroom4plusValue}
        inputFieldRef={Bedroom4plusRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bedroom4plus"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentBedroom4plusValue}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.Bedroom4plus?.hasError) {
              runValidationTasks("Bedroom4plus", value);
            }
            setCurrentBedroom4plusValue(value);
          }}
          onBlur={() =>
            runValidationTasks("Bedroom4plus", currentBedroom4plusValue)
          }
          errorMessage={errors.Bedroom4plus?.errorMessage}
          hasError={errors.Bedroom4plus?.hasError}
          ref={Bedroom4plusRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Bedroom4plus")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || pivotTable)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || pivotTable) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
