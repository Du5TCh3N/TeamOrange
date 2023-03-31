import json
from src.modeller import Modeller
import datetime


def lambda_handler(event, context):
    # Extract the policy, supply, startDate, and endDate values from the event parameter.
    policy = event.get("policy")
    supply = event.get("supply")
    startDate = event.get("startDate")
    endDate = event.get("endDate")
    missing_data = []

    # Check whether any of the required parameters are missing.
    # If any of the values are missing, they will be added to the missing_data list.
    if policy is None:
        missing_data.append("policy")
    if supply is None:
        missing_data.append("supply")
    if startDate is None:
        missing_data.append("startDate")
    if endDate is None:
        missing_data.append("endDate")

    # If any of the required parameters are missing,
    # the function will return an error message containing the names of the missing parameters.
    if len(missing_data) > 0:
        message = "Missing " + ", ".join(missing_data) + " data in event"
        return {
            'statusCode': 400,
            'body': json.dumps(message)
        }

    print(policy)

    # Convert the startDate and endDate values from strings to date objects using the strptime() method.
    startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d').date()
    endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d').date()

    # Creates a Modeller object with the required parameters.
    modeller = Modeller(startDate=startDate, endDate=endDate, policy=policy, supply=supply)

    # Returns a 200 (OK) JSON response containing the policy parameter.
    return {
        'statusCode': 200,
        'body': json.dumps(policy)
    }
