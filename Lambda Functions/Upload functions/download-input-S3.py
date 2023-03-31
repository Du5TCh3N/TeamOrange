import json
import boto3


s3 = boto3.client('s3')

def lambda_handler(event, context):
    input_s3_uri = event['input']['input']
    bucket, key = input_s3_uri.replace('s3://', '').split('/', 1)
    # process and move the json object for the step function
    response = s3.get_object(Bucket=bucket, Key=key)
    content = response['Body'].read().decode('utf-8')
    input_payload = json.loads(content)
    print(input_payload)
    result = {
        "headers": input_payload["row_ranges"][0]["headers"],
        "input": input_s3_uri,
        "dummy_array": list(range(len(input_payload["row_ranges"])))
    }
    return result