"""
Allocation Policy

Applications
ApplicationID | Band | Category | Bedroom | BandStartDate | Wait Time


Property
PropertyID | Bedroom | Category | ReleaseDate
ReleaseDate
    1. Do we assume properties open up after certain times
        Apparently council get access to homes every year (58 1 bed flats, 53 2 bed flats, etc)
    2. Can we get some tracking information on property availability

Order applications by BandStartDate
Initialize current_date to track allocation process
while loop to (while current_date < latest date in data)
    add applications who have the same BandStartDate as current_date to pool
    sort applications by Category
    Category is split by Band
    Band is ordered by BandStartDate
    bands are connected in order (1 to 5)
    if current_date == Property.ReleaseDate
        check category of property
        find highest priority in fitting applications
    increment application's waiting time
    increment current_date
"""
import datetime


class Property:
    id_counter = 0
    __instances = []

    def __init__(self, BedroomSize, Category, ReleaseDate):
        self.PropertyID = Property.id_counter
        Property.id_counter += 1
        self.BedroomSize = BedroomSize
        self.Category = Category
        self.ReleaseDate = datetime.datetime.strptime(ReleaseDate.strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S')
        Property.__instances.append(self)

    def __str__(self):
        return f"PropertyID: {self.PropertyID}, Category: {self.Category}, BedroomSize: {self.BedroomSize}, " \
               f"ReleaseDate: {self.ReleaseDate}"

    def getSize(self):
        return self.BedroomSize

    def getCategory(self):
        return self.Category

    @classmethod
    def getAllProperties(cls):
        return [properties for properties in cls.__instances]

    @classmethod
    def getNumProperties(cls):
        return len(cls.__instances)

    @classmethod
    def getPropertiesByRoomSize(cls, BedroomSize):
        return [prop for prop in cls.__instances if prop.BedroomSize == BedroomSize]

    @classmethod
    def getPropertiesByCategory(cls, Category):
        return [prop for prop in cls.__instances if prop.Category == Category]

    @classmethod
    def getNumberOfPropertiesByCategory(cls, Category):
        return len([prop for prop in cls.__instances if prop.Category == Category])

    @classmethod
    def getPropertiesByDate(cls, Date):
        return [prop for prop in cls.__instances if prop.ReleaseDate == Date]

    @classmethod
    def generateProperties(cls, BedroomSize, Category, ReleaseDate, number):
        for i in range(number):
            cls(BedroomSize, Category, ReleaseDate)

    @classmethod
    def assignProperty(cls, BedroomSize, Category):
        # Find a property instance with the same BedroomSize and Category
        for prop in cls.__instances:
            if prop.BedroomSize == BedroomSize and prop.Category == Category:
                # Remove the property instance from instances and return it
                cls.__instances.remove(prop)
                return prop

        # If no matching property instance is found, return None
        return None

    @classmethod
    def deleteProperty(cls, property):
        if property in cls.__instances:
            cls.__instances.remove(property)

    @classmethod
    def createInstances(cls, instances):
        cls.__instances = instances

    @classmethod
    def clearInstances(cls):
        cls.__instances = []
