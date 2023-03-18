import datetime

import pandas as pd


class Applications:
    instances = []

    def __init__(self, ID, Band, Category, BedroomSize, StartDate):
        self.ApplicationID = ID
        self.Band = Band
        self.Category = Category
        self.BedroomSize = BedroomSize
        self.StartDate = datetime.datetime.strptime(StartDate, '%Y-%m-%d %H:%M:%S')
        self.WaitTime = 0
        Applications.instances.append(self)

    def __str__(self):
        return f"ApplicationID: {self.ApplicationID}, Band: {self.Band}, Category: {self.Category}, " \
               f"BedroomSize: {self.BedroomSize}, StartDate: {self.StartDate}"

    @classmethod
    def getAllApplications(cls):
        return [applications for applications in cls.instances]

    @classmethod
    def getNumApplications(cls):
        return len(cls.instances)

    @classmethod
    def checkExistence(cls, instance):
        if instance in cls.instances:
            return True
        else:
            return False

    @classmethod
    def getApplicationsByBand(cls, Band):
        return [applications for applications in cls.instances if applications.Band == Band]

    @classmethod
    def getApplicationsBySize(cls, BedroomSize):
        return [applications for applications in cls.instances if applications.BedroomSize == BedroomSize]

    @classmethod
    def getApplicationsByCategory(cls, Category):
        return [applications for applications in cls.instances if applications.Category == Category]

    @classmethod
    def getApplicationsByDate(cls, Date):
        datetime_date = datetime.datetime.combine(Date, datetime.datetime.min.time())
        return [application for application in cls.instances if application.StartDate == datetime_date]
        
    @classmethod
    def getNumberOfApplicationsByDate(cls, Date):
        datetime_date = datetime.datetime.combine(Date, datetime.datetime.min.time())
        return len([application for application in cls.instances if application.StartDate == datetime_date])

    @classmethod
    def getApplicationsBeforeDate(cls, Date):
        datetime_date = datetime.datetime.combine(Date, datetime.datetime.min.time())
        return [application for application in cls.instances if application.StartDate <= datetime_date]
        
    @classmethod
    def getNumberOfApplicationsBeforeDate(cls, Date, StartDate):
        datetime_start_date = datetime.datetime.combine(StartDate, datetime.datetime.min.time())
        datetime_end_date = datetime.datetime.combine(Date, datetime.datetime.min.time())
        return len([application for application in cls.instances if datetime_start_date <= application.StartDate <= datetime_end_date])



    @classmethod
    def from_dataframe(cls, df):
        for index, row in df.iterrows():
            if index is None or row is None:
                break
            if any(pd.isna(row)):
                continue
            ID = row.get('ApplicationId', None)
            Band = row.get('Band', 5)
            Category = row.get('AppCategory', "Other")
            if Category == "Temporary Decants":
                Category = "Decants"
            elif Category == "Permanent Decants":
                Category = "Decants"
            elif Category == "First time applicants":
                Category = "FirstTimeApplicant"
            elif Category == "home scheme":
                Category = "HomeScheme"
            elif Category == "Homeless":
                Category = "Homeless"
            elif Category == "Social Services Quota (adult)":
                Category = "SocialServicesQuota"
            elif Category == "Social Services Quota (Children)":
                Category = "SocialServicesQuota"
            elif Category == "Spare Room downsizer":
                Category = "Downsizer"
            elif Category == "Under occupier":
                Category = "Downsizer"
            elif Category == "Transfer":
                Category = "Transfer"
            elif Category == "Tenant Finder Service (TFS) Prevention":
                Category = "TenantFinder"
            elif Category == "Panel moves":
                Category = "PanelMoves"
            else:
                Category = "Other"
            BedroomSize = int(row.get('Bedroom', 1) or 1)
            StartDateRaw = row['BandStartDate'][:19]
            # print(StartDateRaw)
            StartDate = datetime.datetime.strptime(StartDateRaw, '%Y-%m-%d %H:%M:%S').date()
            StartDate_str = StartDate.strftime('%Y-%m-%d %H:%M:%S')
            cls(ID, Band, Category, BedroomSize, StartDate_str)


    @classmethod
    def getApplicationsBySizeAndCategory(cls, BedroomSize, Category):
        # Find all application instances of the requested BedroomSize and Category
        applications = [application for application in cls.instances if
                        application.BedroomSize == BedroomSize and application.Category == Category]

        # Split the applications into lists based on their Band
        band_applications = {}
        for application in applications:
            if application.Band not in band_applications:
                band_applications[application.Band] = []
            band_applications[application.Band].append(application)

        # Sort each band list by their StartDate
        for band, application_list in band_applications.items():
            application_list.sort(key=lambda x: x.StartDate)

        # Return the dictionary of band applications
        return band_applications

    @classmethod
    def findPriority(cls, BedroomSize, Category):
        waitingList = Applications.getApplicationsBySizeAndCategory(BedroomSize, Category)

        # Check if the dictionary is empty
        if not waitingList:
            return None

        # Find the list in band_applications with the lowest numbered band
        priority_band = min(waitingList.keys())

        # Return the first element of the priority_band list, if it exists
        priority_list = waitingList.get(priority_band, [])
        if priority_list:
            candidate = priority_list[0]
            # cls.instances.remove(candidate)
            return candidate

        # If no priority_list is found, return None
        return None

    @classmethod
    def removeApplicationByID(cls, ApplicationID):
        for application in cls.instances:
            if application.ApplicationID == ApplicationID:
                cls.instances.remove(application)
                return True
        return False

    @classmethod
    def removeApplication(cls, instance):
        if instance in cls.instances:
            cls.instances.remove(instance)
            
    @classmethod
    def updateWaitingTime(cls, currentDate):
        for application in cls.instances:
            currentDate_date = datetime.date(currentDate.year, currentDate.month, currentDate.day)
            startDate_date = datetime.date(application.StartDate.year, application.StartDate.month, application.StartDate.day)
            application.WaitTime = (currentDate_date - startDate_date).days

            
    @classmethod
    def getAverageWaitingTime(cls):
        waiting_times = []
        for application in cls.instances:
            waiting_times.append(application.WaitTime)
        if len(waiting_times) > 0:
            return sum(waiting_times) / len(waiting_times)
        else:
            return 0