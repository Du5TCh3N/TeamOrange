import csv
import datetime
import tempfile

import pandas as pd
from applications import Applications
from property import Property

import boto3


def resolveApplication():
    availableProperties = Property.getAllProperties()
    resolvedCounter = 0
    for prop in availableProperties:
        Category = prop.getCategory()
        Size = prop.getSize()
        # print(prop)
        candidate = Applications.findPriority(Category=Category, BedroomSize=Size)
        # print(candidate)
        if candidate is None:
            continue
        Property.deleteProperty(prop)
        Applications.removeApplication(candidate)
        resolvedCounter += 1
    return resolvedCounter


class Modeller:

    def __init__(self, startDate, endDate, currentDate=None, propertyReleaseType="Randomly", policy=None, supply=None):
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
        totalSupply = sum(supply.values())

        self.startDate = startDate
        self.endDate = endDate
        self.currentDate = currentDate if currentDate is not None else startDate
        self.propertyReleaseType = propertyReleaseType

        # self.housing_stock = pd.read_excel("../data/HRA_stock.xlsx", engine="openpyxl")
        # self.housing_register = pd.read_excel("../data/RBK_Housing_Register.xlsx", engine="openpyxl")
        dynamodb = boto3.resource('dynamodb', region_name='eu-west-2')
        rbk_housing_table = dynamodb.Table('rbkhousingtable')

        response = rbk_housing_table.scan()
        items = response['Items']

        rbkHousing = pd.DataFrame(items)
        rbkHousing.dropna(inplace=True)
        self.housing_register = rbkHousing

        Applications.from_dataframe(self.housing_register)

        self.assignHouseToCategory(1, "Decants")
        self.assignHouseToCategory(2, "Decants")
        self.assignHouseToCategory(3, "Decants")
        self.assignHouseToCategory(4, "Decants")
        self.assignHouseToCategory(1, "PanelMoves")
        self.assignHouseToCategory(2, "PanelMoves")
        self.assignHouseToCategory(3, "PanelMoves")
        self.assignHouseToCategory(4, "PanelMoves")
        self.assignHouseToCategory(1, "Homeless")
        self.assignHouseToCategory(2, "Homeless")
        self.assignHouseToCategory(3, "Homeless")
        self.assignHouseToCategory(4, "Homeless")
        self.assignHouseToCategory(1, "SocialServicesQuota")
        self.assignHouseToCategory(2, "SocialServicesQuota")
        self.assignHouseToCategory(3, "SocialServicesQuota")
        self.assignHouseToCategory(4, "SocialServicesQuota")
        self.assignHouseToCategory(1, "Transfer")
        self.assignHouseToCategory(2, "Transfer")
        self.assignHouseToCategory(3, "Transfer")
        self.assignHouseToCategory(4, "Transfer")
        self.assignHouseToCategory(1, "HomeScheme")
        self.assignHouseToCategory(2, "HomeScheme")
        self.assignHouseToCategory(3, "HomeScheme")
        self.assignHouseToCategory(4, "HomeScheme")
        self.assignHouseToCategory(1, "FirstTimeApplicants")
        self.assignHouseToCategory(2, "FirstTimeApplicants")
        self.assignHouseToCategory(3, "FirstTimeApplicants")
        self.assignHouseToCategory(4, "FirstTimeApplicants")
        self.assignHouseToCategory(1, "TenantFinder")
        self.assignHouseToCategory(2, "TenantFinder")
        self.assignHouseToCategory(3, "TenantFinder")
        self.assignHouseToCategory(4, "TenantFinder")
        self.assignHouseToCategory(1, "Downsizer")
        self.assignHouseToCategory(2, "Downsizer")
        self.assignHouseToCategory(3, "Downsizer")
        self.assignHouseToCategory(4, "Downsizer")

        # allProperties = Property.getAllProperties()
        # for property in allProperties:
        #     print(property)

        # numOfProperties = Property.getNumProperties()
        # print(str(numOfProperties) + " properties were allocated to categories for giving out")
        # difTotalSupply = self.totalSupply - numOfProperties
        # print(str(difTotalSupply) + " properties were not used of the total supply")

        # data = []
        data = {
            "Date": [],
            "Queue": [],
            "New": [],
            "Resolved": []
        }

        while self.currentDate < self.endDate:
            queuedApplication = Applications.getNumberOfApplicationsBeforeDate(self.currentDate)
            newApplication = Applications.getNumberOfApplicationsByDate(self.currentDate)
            resolvedApplication = resolveApplication()

            # Convert date to string using isoformat()
            date_str = self.currentDate.isoformat()

            # Add ID to the item dictionary
            # item = {'ID': str(id_counter), 'Date': date_str, 'Queue': len(queuedApplication), 'New': len(newApplication),
            #         'Resolved': resolvedApplication}
            data["Date"].append(date_str)
            data["Queue"].append(queuedApplication)
            data['New'].append(newApplication)
            data["Resolved"].append(resolvedApplication)

            currentDate_date = datetime.date(self.currentDate.year, self.currentDate.month, self.currentDate.day)
            Applications.updateWaitingTime(currentDate_date)
            self.currentDate += datetime.timedelta(days=1)

        # Add the data to the DynamoDB table
        self.saveToDynamoDB(data)

        print("Terminating Model")

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

    def assignHouseToCategory(self, BedroomSize, Category):
        total = self.supply[str(BedroomSize)]
        assignedForCategory = int(total * self.policy[Category])

        Property.generateProperties(BedroomSize, Category, self.currentDate, assignedForCategory)

    def displayCurrentDate(self):
        print("The current date is:", self.currentDate)

    def saveToDynamoDB(self, data):
        # dynamodb = boto3.resource('dynamodb', region_name='eu-west-2')
        # csv_table = dynamodb.Table('ModellerCSV')
        # for item in data:
        #     csv_table.put_item(Item=item)
        # print("Wait Time: " + str(Applications.getAverageWaitingTime()))
        # simulation_data_table = dynamodb.Table('SimulationData-knysgdi44vfgzcpw5osxnn6q7e-msciorange')
        # simulation_result = {"id": "1", "Average Waiting Time": str(Applications.getAverageWaitingTime())}
        # simulation_data_table.put_item(Item=simulation_result)
        dynamodb = boto3.resource('dynamodb', region_name='eu-west-2')
        table = dynamodb.Table('SimulationData-uovztv4lpfbj3mt537ffkqx2kq-dev')

        # Create a new item with the entire list as attributes
        item = {
            'id': '1',  # Set the id to any value you like
            'date': data['Date'],
            'queued': data['Queue'],
            'resolved': data['Resolved'],
            'new': data['New'],
            'createdAt': str(datetime.datetime.now())
        }

        table.put_item(Item=item)


# from wsgiref.simple_server import make_server

if __name__ == "__main__":
    modeller = Modeller(startDate=datetime.date(2022, 1, 1), endDate=datetime.date(2022, 12, 31))
    # modeller.saveToDynamoDB()
    # print(rbkHousing)