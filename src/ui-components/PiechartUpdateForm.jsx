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
import { Piechart } from "../models";
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
export default function PiechartUpdateForm(props) {
  const {
    id: idProp,
    piechart: piechartModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    category: [],
    resolved: [],
    applications: [],
  };
  const [category, setCategory] = React.useState(initialValues.category);
  const [resolved, setResolved] = React.useState(initialValues.resolved);
  const [applications, setApplications] = React.useState(
    initialValues.applications
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = piechartRecord
      ? { ...initialValues, ...piechartRecord }
      : initialValues;
    setCategory(cleanValues.category ?? []);
    setCurrentCategoryValue("");
    setResolved(cleanValues.resolved ?? []);
    setCurrentResolvedValue("");
    setApplications(cleanValues.applications ?? []);
    setCurrentApplicationsValue("");
    setErrors({});
  };
  const [piechartRecord, setPiechartRecord] = React.useState(piechartModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Piechart, idProp)
        : piechartModelProp;
      setPiechartRecord(record);
    };
    queryData();
  }, [idProp, piechartModelProp]);
  React.useEffect(resetStateValues, [piechartRecord]);
  const [currentCategoryValue, setCurrentCategoryValue] = React.useState("");
  const categoryRef = React.createRef();
  const [currentResolvedValue, setCurrentResolvedValue] = React.useState("");
  const resolvedRef = React.createRef();
  const [currentApplicationsValue, setCurrentApplicationsValue] =
    React.useState("");
  const applicationsRef = React.createRef();
  const validations = {
    category: [],
    resolved: [],
    applications: [],
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
          category,
          resolved,
          applications,
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
            Piechart.copyOf(piechartRecord, (updated) => {
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
      {...getOverrideProps(overrides, "PiechartUpdateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              category: values,
              resolved,
              applications,
            };
            const result = onChange(modelFields);
            values = result?.category ?? values;
          }
          setCategory(values);
          setCurrentCategoryValue("");
        }}
        currentFieldValue={currentCategoryValue}
        label={"Category"}
        items={category}
        hasError={errors?.category?.hasError}
        errorMessage={errors?.category?.errorMessage}
        setFieldValue={setCurrentCategoryValue}
        inputFieldRef={categoryRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Category"
          isRequired={false}
          isReadOnly={false}
          value={currentCategoryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.category?.hasError) {
              runValidationTasks("category", value);
            }
            setCurrentCategoryValue(value);
          }}
          onBlur={() => runValidationTasks("category", currentCategoryValue)}
          errorMessage={errors.category?.errorMessage}
          hasError={errors.category?.hasError}
          ref={categoryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "category")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              category,
              resolved: values,
              applications,
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
          isRequired={false}
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
              category,
              resolved,
              applications: values,
            };
            const result = onChange(modelFields);
            values = result?.applications ?? values;
          }
          setApplications(values);
          setCurrentApplicationsValue("");
        }}
        currentFieldValue={currentApplicationsValue}
        label={"Applications"}
        items={applications}
        hasError={errors?.applications?.hasError}
        errorMessage={errors?.applications?.errorMessage}
        setFieldValue={setCurrentApplicationsValue}
        inputFieldRef={applicationsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Applications"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentApplicationsValue}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.applications?.hasError) {
              runValidationTasks("applications", value);
            }
            setCurrentApplicationsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("applications", currentApplicationsValue)
          }
          errorMessage={errors.applications?.errorMessage}
          hasError={errors.applications?.hasError}
          ref={applicationsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "applications")}
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
          isDisabled={!(idProp || piechartModelProp)}
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
              !(idProp || piechartModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
