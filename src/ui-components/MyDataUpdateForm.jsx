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
import { MyData } from "../models";
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
export default function MyDataUpdateForm(props) {
  const {
    id: idProp,
    myData,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    date: [],
    queued: [],
    resolved: [],
    new: [],
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [queued, setQueued] = React.useState(initialValues.queued);
  const [resolved, setResolved] = React.useState(initialValues.resolved);
  const [new1, setNew1] = React.useState(initialValues.new);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = myDataRecord
      ? { ...initialValues, ...myDataRecord }
      : initialValues;
    setDate(cleanValues.date ?? []);
    setCurrentDateValue("");
    setQueued(cleanValues.queued ?? []);
    setCurrentQueuedValue("");
    setResolved(cleanValues.resolved ?? []);
    setCurrentResolvedValue("");
    setNew1(cleanValues.new ?? []);
    setCurrentNew1Value("");
    setErrors({});
  };
  const [myDataRecord, setMyDataRecord] = React.useState(myData);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(MyData, idProp) : myData;
      setMyDataRecord(record);
    };
    queryData();
  }, [idProp, myData]);
  React.useEffect(resetStateValues, [myDataRecord]);
  const [currentDateValue, setCurrentDateValue] = React.useState("");
  const dateRef = React.createRef();
  const [currentQueuedValue, setCurrentQueuedValue] = React.useState("");
  const queuedRef = React.createRef();
  const [currentResolvedValue, setCurrentResolvedValue] = React.useState("");
  const resolvedRef = React.createRef();
  const [currentNew1Value, setCurrentNew1Value] = React.useState("");
  const new1Ref = React.createRef();
  const validations = {
    date: [{ type: "Required" }],
    queued: [{ type: "Required" }],
    resolved: [{ type: "Required" }],
    new: [{ type: "Required" }],
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
          date,
          queued,
          resolved,
          new: new1,
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
            MyData.copyOf(myDataRecord, (updated) => {
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
      {...getOverrideProps(overrides, "MyDataUpdateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              date: values,
              queued,
              resolved,
              new: new1,
            };
            const result = onChange(modelFields);
            values = result?.date ?? values;
          }
          setDate(values);
          setCurrentDateValue("");
        }}
        currentFieldValue={currentDateValue}
        label={"Date"}
        items={date}
        hasError={errors?.date?.hasError}
        errorMessage={errors?.date?.errorMessage}
        setFieldValue={setCurrentDateValue}
        inputFieldRef={dateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Date"
          isRequired={true}
          isReadOnly={false}
          value={currentDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.date?.hasError) {
              runValidationTasks("date", value);
            }
            setCurrentDateValue(value);
          }}
          onBlur={() => runValidationTasks("date", currentDateValue)}
          errorMessage={errors.date?.errorMessage}
          hasError={errors.date?.hasError}
          ref={dateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "date")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              date,
              queued: values,
              resolved,
              new: new1,
            };
            const result = onChange(modelFields);
            values = result?.queued ?? values;
          }
          setQueued(values);
          setCurrentQueuedValue("");
        }}
        currentFieldValue={currentQueuedValue}
        label={"Queued"}
        items={queued}
        hasError={errors?.queued?.hasError}
        errorMessage={errors?.queued?.errorMessage}
        setFieldValue={setCurrentQueuedValue}
        inputFieldRef={queuedRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Queued"
          isRequired={true}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentQueuedValue}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.queued?.hasError) {
              runValidationTasks("queued", value);
            }
            setCurrentQueuedValue(value);
          }}
          onBlur={() => runValidationTasks("queued", currentQueuedValue)}
          errorMessage={errors.queued?.errorMessage}
          hasError={errors.queued?.hasError}
          ref={queuedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "queued")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              date,
              queued,
              resolved: values,
              new: new1,
            };
            const result = onChange(modelFields);
            values = result?.resolved ?? values;
          }
          setResolved(values);
          setCurrentResolvedValue("");
        }}
        currentFieldValue={currentResolvedValue}
        label={"Resolved"}
        items={resolved}
        hasError={errors?.resolved?.hasError}
        errorMessage={errors?.resolved?.errorMessage}
        setFieldValue={setCurrentResolvedValue}
        inputFieldRef={resolvedRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Resolved"
          isRequired={true}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentResolvedValue}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.resolved?.hasError) {
              runValidationTasks("resolved", value);
            }
            setCurrentResolvedValue(value);
          }}
          onBlur={() => runValidationTasks("resolved", currentResolvedValue)}
          errorMessage={errors.resolved?.errorMessage}
          hasError={errors.resolved?.hasError}
          ref={resolvedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "resolved")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              date,
              queued,
              resolved,
              new: values,
            };
            const result = onChange(modelFields);
            values = result?.new ?? values;
          }
          setNew1(values);
          setCurrentNew1Value("");
        }}
        currentFieldValue={currentNew1Value}
        label={"New"}
        items={new1}
        hasError={errors?.new?.hasError}
        errorMessage={errors?.new?.errorMessage}
        setFieldValue={setCurrentNew1Value}
        inputFieldRef={new1Ref}
        defaultFieldValue={""}
      >
        <TextField
          label="New"
          isRequired={true}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentNew1Value}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.new?.hasError) {
              runValidationTasks("new", value);
            }
            setCurrentNew1Value(value);
          }}
          onBlur={() => runValidationTasks("new", currentNew1Value)}
          errorMessage={errors.new?.errorMessage}
          hasError={errors.new?.hasError}
          ref={new1Ref}
          labelHidden={true}
          {...getOverrideProps(overrides, "new")}
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
          isDisabled={!(idProp || myData)}
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
              !(idProp || myData) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
