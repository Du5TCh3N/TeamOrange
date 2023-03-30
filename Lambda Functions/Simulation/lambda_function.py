import json
from src.modeller import Modeller
import datetime

def lambda_handler(event, context):
    policy = event.get("policy")
    supply = event.get("supply")
    startDate = event.get("startDate")
    endDate = event.get("endDate")
    missing_data = []

    if policy is None:
        missing_data.append("policy")
    if supply is None:
        missing_data.append("supply")
    if startDate is None:
        missing_data.append("startDate")
    if endDate is None:
        missing_data.append("endDate")

    if len(missing_data) > 0:
        message = "Missing " + ", ".join(missing_data) + " data in event"
        return {
            'statusCode': 200,
            'body': json.dumps(message)
        }
    
    print(policy)

    startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d').date()
    endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d').date()

    modeller = Modeller(startDate=startDate, endDate=endDate, policy=policy, supply=supply)

    return {
        'statusCode': 200,
        'body': json.dumps(policy)
    }
