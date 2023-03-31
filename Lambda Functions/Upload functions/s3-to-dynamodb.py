import boto3
import csv
import io
import json
import sys
import datetime
from dateutil import tz

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
table_name = 'rbk_csv_table'
stepfunctions = boto3.client('stepfunctions')


# Split the csv into according chunks
def split_csv_chunks(content, chunk_size):
    csv_reader = csv.reader(io.StringIO(content), delimiter=";")
    headers = next(csv_reader)
    rows = list(csv_reader)
    headers[headers.index("ApplicationId")] = "ApplicationIdTime"
    headers.append("createdAt")
    headers.append("updatedAt")
    row_ranges = []
    for i in range(0, len(rows), chunk_size):
        row_ranges.append({
            'headers': headers,
            'rows': rows[i:i + chunk_size]
        })

    return row_ranges


def lambda_handler(event, context):
    # Retrieve the file from the trigger event
    if 'Records' in event:
        bucket = event['Records'][0]['s3']['bucket']['name']
        key = event['Records'][0]['s3']['object']['key']
    else:
        bucket = 'stepfunctioninputs'
        key = event['Key']
    response = s3.get_object(Bucket=bucket, Key=key)
    content = response['Body'].read().decode('utf-8')
    chunk_size = 20  # Adjust this based on your requirements
    row_ranges = split_csv_chunks(content, chunk_size)
    input_payload_s3_key = 'input-payload.json'
    input_payload = {
        "input": f"s3://stepfunctioninputs/{input_payload_s3_key}",
        "row_ranges": row_ranges
    }

    # Upload input payload as S3 object
    s3.put_object(Bucket='stepfunctioninputs', Key='input-payload.json', Body=json.dumps(input_payload))

    # Reference S3 object as input to Step Function
    step_function_arn = "arn:aws:states:eu-west-2:538841638676:stateMachine:process-csv-machine"
    input_payload_s3_uri = f's3://stepfunctioninputs/{input_payload_s3_key}'
    execution_input = {
        'input': input_payload_s3_uri
    }
    # start step function
    stepfunctions.start_execution(
        stateMachineArn=step_function_arn,
        input=json.dumps(execution_input)
    )
    return {
        "bucket": bucket,
        "key": key,
        "row_ranges": row_ranges
    }
