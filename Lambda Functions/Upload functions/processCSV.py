import boto3
import csv
import io
import json
import sys
import datetime
from dateutil import tz

dynamodb = boto3.resource('dynamodb')
table_name = 'rbk_csv_table'
s3 = boto3.client('s3')


def lambda_handler(event, context):
    # Download bucket content using the bucket's ARI
    row_ranges_s3_uri = event['input_s3_uri']
    bucket, key = row_ranges_s3_uri.replace('s3://', '').split('/', 1)
    response = s3.get_object(Bucket=bucket, Key=key)
    content = response['Body'].read().decode('utf-8')
    input_payload = json.loads(content)
    # Get the current chunk
    row_range_index = event['row_range_index']
    row_range = input_payload['row_ranges'][row_range_index]['rows']
    headers = input_payload['row_ranges'][0]['headers']
    # Added the two new headers
    headers.append("createdAt")
    headers.append("updatedAt")
    rows = [dict(zip(headers, row)) for row in row_range]

    table = dynamodb.Table(table_name)
    # write the entries to the dynamodb table
    with table.batch_writer() as batch:
        for row in rows:
            row["ApplicationIdTime"] = "/".join([row["ApplicationIdTime"], datetime.datetime.now(tz.UTC).isoformat()])
            row["updatedAt"] = datetime.datetime.now(tz.UTC).isoformat()
            if "createdAt" not in row.keys():
                row["createdAt"] = datetime.datetime.now(tz.UTC).isoformat()
            batch.put_item(Item=row)
    print("DONE SUC")
    return "Success"




