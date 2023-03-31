import json
import boto3
import csv
import io
import sys
import pandas as pd
import copy

s3 = boto3.client('s3')

tableName = 'PivotTable-6digekhjd5ekhhylpdrggkmczm-prod'

def saveToDynamoDB(data, id):
    from dateutil import tz
    from datetime import datetime
    
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-2')
    table = dynamodb.Table(tableName)

    data_copy = copy.deepcopy(data)
    
    if len(data_copy) == 5:
        data_copy.append([])

    # Create a new item with the entire list as attributes
    item = {
        'id': id,  # Set the id to any value you like
        '__typename': 'PivotTableData',
        'Bedroom1': data_copy[0],
        'Bedroom2': data_copy[1],
        'Bedroom3': data_copy[2],
        'Bedroom4': data_copy[3],
        'Bedroom5': data_copy[4],
        'Summary': data_copy[5],
        'createdAt': datetime.now(tz.UTC).isoformat(),
        'updatedAt': datetime.now(tz.UTC).isoformat(),
        '_version': 1,
        '_lastChangedAt': int(datetime.now(tz.UTC).timestamp() * 1000)
    }

    table.put_item(Item=item)
    
def lambda_handler(event, context):
    print(event)
    bucket = "process-transfer"
    key = "input-payload.json"
    response = s3.get_object(Bucket=bucket, Key=key)
    content = response['Body'].read().decode('utf-8')
    entries = json.loads(content)
    print(entries["bedrooms"])
    headers = list(entries["data"][0].keys())
    rows = [list(entry.values()) for entry in entries["data"]]
    headers[0] = "FlatID"
    for row in rows:
        row[1] = int(row[1])
        row[5] = int(row[5])
    df = pd.DataFrame(rows ,columns=headers)
    df.loc[0] = rows[0]
    pivot_df = df.pivot_table(index='Bedroom', columns='ExpectedSpace', aggfunc='count')
    
    new_df = pivot_df.iloc[:, :5]
    
    nested_list = new_df.values.tolist()
    print("Old Pivot Table")
    for row in nested_list:
        print(row)
    saveToDynamoDB(nested_list, "BeforeTransfer")
        
    new_nested_list = copy.deepcopy(nested_list)
    
    cost_saved = 0
    
    def checkPriceSaved(currentSize, newSize, downsizer_num):
        currentPrice = 0
        newPrice = 0
        
        if currentSize==1:
            currentPrice = 5000
        elif currentSize==2:
            currentPrice = 8000
        else: 
            currentPrice = 14000
            
        if newSize==1:
            newPrice = 5000
        elif newSize==2:
            newPrice = 8000
        else: 
            newPrice = 14000
        
        refund = currentPrice - newPrice
        cost = newPrice - currentPrice
        
        total_refund = refund * downsizer_num
        total_cost = cost * downsizer_num
        
        priceDifference = total_refund - total_cost
        return priceDifference
        
    
    void = entries["bedrooms"]
    moved = [0, 0, 0, 0, 0]
    for i in range(len(nested_list)-1, -1, -1):
        new_vacant = 0
        for j in range(0, len(void)):
            if j < i:
                underoccupied = nested_list[i][j]
                capacity = void[j]
                if underoccupied <= capacity:
                    void[j] -= underoccupied
                    moved[j] += underoccupied
                    new_vacant += underoccupied
                    new_nested_list[i][j] = 0
                    new_nested_list[j][j] += underoccupied
                
                else:
                    void[j] = 0
                    moved[j] += capacity
                    new_vacant += capacity
                    new_nested_list[i][j] += 0 - capacity
                    new_nested_list[j][j] += capacity
        void[i] += new_vacant
        # print(void)
    print("")
    print("New Pivot Table")
    for row in new_nested_list:
        print(row)
    
    saveToDynamoDB(new_nested_list, "AfterTransfer")
    
    prices = []
    summary = [[], [], [], [], [], []]
    
    totalCostSaved = 0
    totalMoved = sum(moved)
    
    for i in range(len(new_nested_list)):
        old_sum = sum(nested_list[i])
        new_sum = sum(new_nested_list[i])
        sum_dif = abs(old_sum - new_sum)
        price = 0
        if i == 0:
            price = 5000
        elif i == 1:
            price = 8000
        else:
            price = 14000
        old_price = old_sum*price
        new_price = new_sum*price
        price_dif = abs(old_price - new_price)
        totalCostSaved += price_dif
        prices.append([old_sum, old_price, new_sum, new_price, sum_dif, price_dif])

    if totalMoved != 0:
        maxPerHousehold = totalCostSaved / totalMoved
        maxPerHousehold = round(maxPerHousehold, 2)
    else: 
        maxPerHousehold = 0
    
    summary[5] = [str(totalCostSaved), str(totalMoved), str(maxPerHousehold)]
    formatted_cost = "£{:,.2f}".format(float(summary[5][0]))
    summary[5][0] = formatted_cost
    formatted_range = "£{:,.2f} ~ £{:,.2f}".format(0, float(summary[5][2]))
    summary[5][2] = formatted_range
    print("")
    print("Summary")
    print(summary)
    print("")
    saveToDynamoDB(summary, "Cost")

    


