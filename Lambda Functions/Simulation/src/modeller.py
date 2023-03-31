import csv
import datetime
from dateutil import tz

import pandas as pd
from src.application import Application
from src.property import Property

import boto3
import json

dynamoDBTableName = "-6digekhjd5ekhhylpdrggkmczm-prod"


def resolveApplication(currentDate):
    availableProperties = Property.getAllProperties()
    resolvedCounter = 0

    for prop in availableProperties:
        Category = prop.getCategory()
        Size = prop.getSize()

        candidate = Application.findPriority(Category=Category, BedroomSize=Size, Date=currentDate)

        if candidate is None:
            continue
        Property.deleteProperty(prop)
        Application.removeApplication(candidate)
        resolvedCounter += 1
    return resolvedCounter


def saveToDynamoDB(data):
    from datetime import datetime

    dynamodb = boto3.resource('dynamodb', region_name='eu-west-2')
    tableName = "SimulationData" + dynamoDBTableName
    table = dynamodb.Table(tableName)

    # Create a new item with the entire list as attributes
    item = {
        'id': 'LambdaSimulation',  # Set the id to any value you like
        '__typename': 'SimulationData',
        'date': data['Date'],
        'queued': data['Queue'],
        'resolved': data['Resolved'],
        'new': data['New'],
        'createdAt': datetime.now(tz.UTC).isoformat(),
        'updatedAt': datetime.now(tz.UTC).isoformat(),
        '_version': 1,
        '_lastChangedAt': int(datetime.now(tz.UTC).timestamp() * 1000)
    }

    table.put_item(Item=item)


def savePieChartToDynamoDB(category_stat, band_stat, bedroom_stat):
    from datetime import datetime

    category_list = list(category_stat.keys())
    category_value_list = list(category_stat.values())
    band_list = list(band_stat.keys())
    band_value_list = list(band_stat.values())
    bedroom_list = list(bedroom_stat.keys())
    bedroom_value_list = list(bedroom_stat.values())

    dynamodb = boto3.resource("dynamodb")
    tableName = "Piechart" + dynamoDBTableName
    table = dynamodb.Table(tableName)
    table.put_item(
        Item={
            'id': 'category_piechart',
            'category': category_list,
            'resolved': category_value_list,
            '__typename': 'PieChartData',
            'createdAt': datetime.now(tz.UTC).isoformat(),
            'updatedAt': datetime.now(tz.UTC).isoformat(),
            '_version': 1,
            '_lastChangedAt': int(datetime.now(tz.UTC).timestamp() * 1000)
        }
    )
    table.put_item(
        Item={
            'id': 'band_piechart',
            'category': band_list,
            'resolved': band_value_list,
            '__typename': 'PieChartData',
            'createdAt': datetime.now(tz.UTC).isoformat(),
            'updatedAt': datetime.now(tz.UTC).isoformat(),
            '_version': 1,
            '_lastChangedAt': int(datetime.now(tz.UTC).timestamp() * 1000)
        }
    )
    table.put_item(
        Item={
            'id': 'bedroom_piechart',
            'category': bedroom_list,
            'resolved': bedroom_value_list,
            '__typename': 'PieChartData',
            'createdAt': datetime.now(tz.UTC).isoformat(),
            'updatedAt': datetime.now(tz.UTC).isoformat(),
            '_version': 1,
            '_lastChangedAt': int(datetime.now(tz.UTC).timestamp() * 1000)
        }
    )


def saveKeyStatToDynamoDB(data):
    from datetime import datetime

    json_str = json.dumps(data)

    dynamodb = boto3.resource("dynamodb")
    tableName = "KeyStats" + dynamoDBTableName
    table = dynamodb.Table(tableName)
    table.put_item(
        Item={
            'id': 'key_stat',
            'data': json_str,
            '__typename': 'keyStats',
            'createdAt': datetime.now(tz.UTC).isoformat(),
            'updatedAt': datetime.now(tz.UTC).isoformat(),
            '_version': 1,
            '_lastChangedAt': int(datetime.now(tz.UTC).timestamp() * 1000)
        }
    )


def saveSimulationToCSV(data, file_path):
    with open(file_path, mode='w', newline='') as csv_file:
        writer = csv.writer(csv_file)

        # Write the header row
        writer.writerow(['Date', 'Queue', 'New', 'Resolved'])

        # Write the data rows
        for i in range(len(data['Date'])):
            row = [data['Date'][i], data['Queue'][i], data['New'][i], data['Resolved'][i]]
            writer.writerow(row)


def saveKeyStatToCSV(key_stat, file_path):
    with open(file_path, mode='w', newline='') as csv_file:
        writer = csv.writer(csv_file)

        # Write the header row
        writer.writerow(['Statistic', 'Value'])

        # Write the data rows
        for key, value in key_stat.items():
            writer.writerow([key, value])


def setupDynamoDB():
    # Connect to DynamoDB and get housing table
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-2')
    rbk_housing_table = dynamodb.Table('rbk_csv_table')
    # Query table
    response = rbk_housing_table.scan()
    items = response['Items']
    
    # Find the latest updatedAt entry
    latest_updatedAt = max(item['updatedAt'] for item in items)
    
    # Set items to be all entries that have the same updatedAt as the latest one
    items = [item for item in items if item['updatedAt'] == latest_updatedAt]
    
    rbkHousing = pd.DataFrame(items)
    rbkHousing.dropna(inplace=True)

    return rbkHousing



def calculateKeyStatistics():
    # Save the key stat of the simulation
    key_stat = {"Average Wait Time": Application.getAverageWaitingTime(), "PanelMoves Average Wait Time": 0.0,
                "Homeless Average Wait Time": 0.0, "SocialServicesQuota Average Wait Time": 0.0,
                "Transfer Average Wait Time": 0.0, "HomeScheme Average Wait Time": 0.0,
                "FirstTimeApplicants Average Wait Time": 0.0, "TenantFinder Average Wait Time": 0.0,
                "Downsizer Average Wait Time": 0.0, "Decants Average Wait Time": 0.0,
                "Other Average Wait Time": 0.0}
    categories = ["PanelMoves", "Homeless", "SocialServicesQuota", "Transfer", "HomeScheme", "FirstTimeApplicants",
                  "TenantFinder", "Downsizer", "Decants", "Other"]
    for category in categories:
        key = f"{category} Average Wait Time"
        key_stat[key] = Application.getAverageWaitingTimeForCategory(category)
    # saveKeyStatToCSV(key_stat, "key_stat.csv")


def calculateGraphs():
    category_stat, band_stat, bedroom_stat = Application.getResolvedInformation()
    savePieChartToDynamoDB(category_stat, band_stat, bedroom_stat)
    # Save the daily result of simulation

def calculateBarcharts():
    from datetime import datetime
    
    dynamodb = boto3.resource("dynamodb")
    tableName = "Barchart" + dynamoDBTableName
    table = dynamodb.Table(tableName)

    bandBarchartData = Application.findDistributionOfBandInApplicationBarchart()
    bandBarchartName = list(bandBarchartData.keys())
    bandBarchartValue = list(bandBarchartData.values())
    table.put_item(
        Item={
            'id': 'band_barchart',
            'name': bandBarchartName,
            'value': bandBarchartValue,
            '__typename': 'BarchartData',
            'createdAt': datetime.now(tz.UTC).isoformat(),
            'updatedAt': datetime.now(tz.UTC).isoformat(),
            '_version': 1,
            '_lastChangedAt': int(datetime.now(tz.UTC).timestamp() * 1000)
        }
    )

    bedroomBarchartData = Application.findDistributionOfBedroomInApplicationBarchart()
    bedroomBarchartName = list(bedroomBarchartData.keys())
    bedroomBarchartValue = list(bedroomBarchartData.values())
    table.put_item(
        Item={
            'id': 'bedroom_barchart',
            'name': bedroomBarchartName,
            'value': bedroomBarchartValue,
            '__typename': 'BarchartData',
            'createdAt': datetime.now(tz.UTC).isoformat(),
            'updatedAt': datetime.now(tz.UTC).isoformat(),
            '_version': 1,
            '_lastChangedAt': int(datetime.now(tz.UTC).timestamp() * 1000)
        }
    )

    yearBarchartData = Application.findDistributionOfApplicationOverYearBarchart()
    yearBarchartName = list(yearBarchartData.keys())
    yearBarchartValue = list(yearBarchartData.values())
    table.put_item(
        Item={
            'id': 'year_barchart',
            'name': yearBarchartName,
            'value': yearBarchartValue,
            '__typename': 'BarchartData',
            'createdAt': datetime.now(tz.UTC).isoformat(),
            'updatedAt': datetime.now(tz.UTC).isoformat(),
            '_version': 1,
            '_lastChangedAt': int(datetime.now(tz.UTC).timestamp() * 1000)
        }
    )

class Modeller:

    def __init__(self, startDate, endDate, currentDate=None, propertyReleaseType="Randomly",
                 policy=None, supply=None):
        self.policy = policy if policy is not None else {
            "PanelMoves": 0.02,
            "Homeless": 0.04,
            "SocialServicesQuota": 0.04,
            "Transfer": 0.01,
            "HomeScheme": 0.04,
            "FirstTimeApplicants": 0.01,
            "TenantFinder": 0.01,
            "Downsizer": 0.02,
            "Decants": 0.8,
            "Other": 0.01
        }

        self.supply = supply if supply is not None else {
            "1": 58,
            "2": 53,
            "3": 29,
            "4": 2
        }

        self.startDate = startDate
        self.endDate = endDate
        self.currentDate = currentDate if currentDate is not None else startDate
        self.propertyReleaseType = propertyReleaseType

        rbkHousing = setupDynamoDB()
        self.housing_register = rbkHousing
        Application.from_dataframe(self.housing_register)
        yearly_table, monthly_table = Application.historicalAnalysis(
            datetime.datetime.combine(self.startDate, datetime.time()))

        self.assignHouseToCategories()

        year_counts, year_averages, month_counts, month_averages = Application.findHistoricalCombinationAverage(
            yearly_table, past_number_years=5, current_year=self.startDate.year)

        # Check if model start after all the applications, decide if generated applications are needed.
        earliest, latest = Application.findTimeRange()
        startDate_datetime = datetime.datetime.combine(self.startDate, datetime.time.min)
        if latest and startDate_datetime >= latest:
            Application.generateApplicationsBasedOnAverage(year_averages, month_averages, self.startDate, self.endDate)

        outputData = self.runModel()
        saveToDynamoDB(outputData)
        calculateGraphs()
        calculateKeyStatistics()
        calculateBarcharts()

        print("Terminating Model")

    def runModel(self):
        outputData = {
            "Date": [],
            "Queue": [],
            "New": [],
            "Resolved": []
        }
        while self.currentDate < self.endDate:
            queuedApplication = Application.getNumberOfApplicationsBetweenDate(self.currentDate, self.startDate)
            queuedApplication = -1 * queuedApplication
            newApplication = Application.getNumberOfApplicationsByDate(self.currentDate)
            resolvedApplication = resolveApplication(datetime.datetime.combine(self.currentDate, datetime.time()))

            # Convert date to string using isoformat()
            date_str = self.currentDate.isoformat()

            # Add ID to the item dictionary
            outputData["Date"].append(date_str)
            outputData["Queue"].append(queuedApplication)
            outputData['New'].append(newApplication)
            outputData["Resolved"].append(resolvedApplication)

            currentDate_date = datetime.date(self.currentDate.year, self.currentDate.month, self.currentDate.day)
            Application.updateWaitingTime(currentDate_date)
            self.currentDate += datetime.timedelta(days=1)
        return outputData

    def setAllocationPolicy(self, PanelMoves, Homeless, SocialServicesQuota, Transfer, HomeScheme, FirstTimeApplicants,
                            TenantFinder, Downsizer, Decants):
        # Update the policy dictionary with the new values
        self.policy["PanelMoves"] = PanelMoves
        self.policy["Homeless"] = Homeless
        self.policy["SocialServicesQuota"] = SocialServicesQuota
        self.policy["Transfer"] = Transfer
        self.policy["HomeScheme"] = HomeScheme
        self.policy["FirstTimeApplicants"] = FirstTimeApplicants
        self.policy["TenantFinder"] = TenantFinder
        self.policy["Downsizer"] = Downsizer
        self.policy["Decants"] = Decants
        total = PanelMoves + Homeless + SocialServicesQuota + Transfer + HomeScheme + FirstTimeApplicants + \
                TenantFinder + Downsizer + Decants
        self.policy["Other"] = 1 - total

    def assignHouseToCategoryForSize(self, BedroomSize, Category):
        total = self.supply[str(BedroomSize)]
        assignedForCategory = int(total * self.policy[Category])

        Property.generateProperties(BedroomSize, Category, self.currentDate, assignedForCategory)

        return assignedForCategory

    def assignHouseToCategories(self):
        categories = ["Decants", "PanelMoves", "Homeless", "SocialServicesQuota", "Transfer", "HomeScheme",
                      "FirstTimeApplicants", "TenantFinder", "Downsizer", "Other"]
        sizes = [1, 2, 3, 4]
        over_all_assignment = [['Category', "1 Bed", "2 Bed", "3 Bed", "4 Bed"]]
        for category in categories:
            category_assignment = [category]
            for size in sizes:
                num = self.assignHouseToCategoryForSize(size, category)
                category_assignment.append(num)
            over_all_assignment.append(category_assignment)

    def displayCurrentDate(self):
        print("The current date is:", self.currentDate)

    def getPolicy(self):
        return self.policy


if __name__ == "__main__":
    data = {
        "policy": {
            "PanelMoves": 0.02,
            "Homeless": 0.04,
            "SocialServicesQuota": 0.04,
            "Transfer": 0.01,
            "HomeScheme": 0.04,
            "FirstTimeApplicants": 0.01,
            "TenantFinder": 0.01,
            "Downsizer": 0.02,
            "Decants": 0.8,
            "Other": 0.01
        },
        "supply": {
            "1": 58,
            "2": 53,
            "3": 29,
            "4": 2
        },
        "startDate": "2023-01-01",
        "endDate": "2023-12-31"
    }
    policy = data.get("policy")
    supply = data.get("supply")
    startDate = data.get("startDate")
    endDate = data.get("endDate")
    startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d').date()
    endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d').date()

    modeller = Modeller(startDate=startDate, endDate=endDate, policy=policy, supply=supply)
