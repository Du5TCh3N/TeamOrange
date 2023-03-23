import datetime

import pandas as pd
import random


class Applications:
    instances = []
    historical = []
    resolved = []

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
    def getNumberOfApplicationsByCategory(cls, Category):
        return len([applications for applications in cls.instances if applications.Category == Category])

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
            StartDateRaw = row['BandStartDate']
            # print(StartDateRaw)
            StartDate = datetime.datetime.strptime(StartDateRaw, '%d/%m/%y').date()
            StartDate_str = StartDate.strftime('%Y-%m-%d %H:%M:%S')
            cls(ID, Band, Category, BedroomSize, StartDate_str)



    @classmethod
    def getApplicationsBySizeAndCategory(cls, BedroomSize, Category, Date):
        # Find all application instances of the requested BedroomSize and Category
        applications = [application for application in cls.instances if
                        application.BedroomSize == BedroomSize and application.Category == Category and application.StartDate <= Date]

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
    def findPriority(cls, BedroomSize, Category, Date):
        waitingList = Applications.getApplicationsBySizeAndCategory(BedroomSize, Category, Date)

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
                cls.resolved.extend(application)
                cls.instances.remove(application)
                return True
        return False

    @classmethod
    def removeApplication(cls, instance):
        if instance in cls.instances:
            cls.instances.remove(instance)
            cls.resolved.append(instance)


    @classmethod
    def getResolvedNumberApplications(cls):
        return len(cls.resolved)

    @classmethod
    def updateWaitingTime(cls, currentDate):
        for application in cls.instances:
            currentDate_date = datetime.date(currentDate.year, currentDate.month, currentDate.day)
            startDate_date = datetime.date(application.StartDate.year, application.StartDate.month, application.StartDate.day)
            if currentDate_date >= startDate_date:
                application.WaitTime = (currentDate_date - startDate_date).days
            else:
                application.WaitTime = 0


    @classmethod
    def getAverageWaitingTime(cls):
        waiting_times = []
        for application in cls.instances:
            waiting_times.append(application.WaitTime)
        if len(waiting_times) > 0:
            return sum(waiting_times) / len(waiting_times)
        else:
            return 0

    @classmethod
    def getAverageWaitingTimeForCategory(cls, Category):
        waiting_times = []
        for application in cls.instances:
            if application.Category == Category:
                waiting_times.append(application.WaitTime)
        if len(waiting_times) > 0:
            return sum(waiting_times) / len(waiting_times)
        else:
            return 0

    @classmethod
    def historicalAnalysis(cls, ModelStartDate):
        cls.historical.extend([app for app in cls.instances if app.StartDate < ModelStartDate])
        # print(f"historical extracted: {len(cls.historical)}")
        cls.instances = [app for app in cls.instances if app.StartDate >= ModelStartDate]
        # print(f"instances left: {len(cls.instances)}")

        # Create two hash tables for year and month
        year_table = {}
        month_table = {}

        # Loop through each historical application and update the hash tables
        for application in cls.historical:
            year = application.StartDate.year
            month = application.StartDate.month
            category = application.Category
            band = application.Band
            bedroom_size = application.BedroomSize

            # Update the year table
            if year not in year_table:
                year_table[year] = {}
            year_key = (category, band, bedroom_size)
            if year_key not in year_table[year]:
                year_table[year][year_key] = 0
            year_table[year][year_key] += 1

            # Update the month table
            if year not in month_table:
                month_table[year] = {}
            if month not in month_table[year]:
                month_table[year][month] = {}
            month_key = (category, band, bedroom_size)
            if month_key not in month_table[year][month]:
                month_table[year][month][month_key] = 0
            month_table[year][month][month_key] += 1

        return (year_table, month_table)

    @classmethod
    def findHistoricalCategoryAverage(cls, year_table, month_table, category, past_number_years=None, current_year=None):
        # Count the total number of applications for the given category over the year
        total_year_count = 0
        year_count = 0
        for year, table in year_table.items():
            if past_number_years is not None and year < current_year - past_number_years:
                continue
            for key, count in table.items():
                if key[0] == category:
                    total_year_count += count
                    year_count += 1

        # Calculate the average number of applications for the given category per year
        if year_count > 0:
            avg_year_count = total_year_count / year_count
        else:
            avg_year_count = 0

        # Count the total number of applications for the given category over each month
        total_month_count = 0
        month_count = 0
        for year, year_table in month_table.items():
            if past_number_years is not None and year < current_year - past_number_years:
                continue
            for month, table in year_table.items():
                for key, count in table.items():
                    if key[0] == category:
                        total_month_count += count
                        month_count += 1

        # Calculate the average number of applications for the given category per month
        if month_count > 0:
            avg_month_count = total_month_count / month_count
        else:
            avg_month_count = 0

        # Return the average counts
        return avg_year_count, avg_month_count

    @classmethod
    def findHistoricalBandAverage(cls, year_table, month_table, band, past_number_years=None, current_year=None):
        # Count the total number of applications for the given category over the year
        total_year_count = 0
        year_count = 0
        for year, table in year_table.items():
            if past_number_years is not None and year < current_year - past_number_years:
                continue
            for key, count in table.items():
                if key[1] == band:
                    total_year_count += count
                    year_count += 1

        # Calculate the average number of applications for the given category per year
        if year_count > 0:
            avg_year_count = total_year_count / year_count
        else:
            avg_year_count = 0

        # Count the total number of applications for the given category over each month
        total_month_count = 0
        month_count = 0
        for year, year_table in month_table.items():
            if past_number_years is not None and year < current_year - past_number_years:
                continue
            for month, table in year_table.items():
                for key, count in table.items():
                    if key[1] == band:
                        total_month_count += count
                        month_count += 1

        # Calculate the average number of applications for the given category per month
        if month_count > 0:
            avg_month_count = total_month_count / month_count
        else:
            avg_month_count = 0

        # Return the average counts
        return avg_year_count, avg_month_count

    @classmethod
    def findHistoricalBedroomAverage(cls, year_table, month_table, bedroom, past_number_years=None, current_year=None):
        # Count the total number of applications for the given category over the year
        total_year_count = 0
        year_count = 0
        for year, table in year_table.items():
            if past_number_years is not None and year < current_year - past_number_years:
                continue
            for key, count in table.items():
                if key[2] == bedroom:
                    total_year_count += count
                    year_count += 1

        # Calculate the average number of applications for the given category per year
        if year_count > 0:
            avg_year_count = total_year_count / year_count
        else:
            avg_year_count = 0

        # Count the total number of applications for the given category over each month
        total_month_count = 0
        month_count = 0
        for year, year_table in month_table.items():
            if past_number_years is not None and year < current_year - past_number_years:
                continue
            for month, table in year_table.items():
                for key, count in table.items():
                    if key[2] == bedroom:
                        total_month_count += count
                        month_count += 1

        # Calculate the average number of applications for the given category per month
        if month_count > 0:
            avg_month_count = total_month_count / month_count
        else:
            avg_month_count = 0

        # Return the average counts
        return avg_year_count, avg_month_count

    @classmethod
    def findHistoricalCombinationAverage(cls, year_table, month_table, past_number_years=None, current_year=None):
        if current_year is None:
            current_year = datetime.datetime.now().year
        if past_number_years is None:
            past_number_years = current_year - min(year_table.keys())

        # Calculate the start and end years based on the current year and past number of years
        start_year = current_year - past_number_years
        end_year = current_year - 1

        # Calculate the total number of years included in the calculation
        num_years = end_year - start_year + 1
        # print("number of years", num_years)

        # Create dictionaries to store the total appearances and average appearances for each combination
        year_counts = {}
        month_counts = {}
        year_averages = {}
        month_averages = {}

        # Loop through each historical application and update the dictionaries
        for application in cls.historical:
            year = application.StartDate.year
            month = application.StartDate.month
            category = application.Category
            band = application.Band
            bedroom_size = application.BedroomSize

            # Check if the application falls within the time range we're interested in
            if year < start_year or year > end_year:
                continue

            # Update the year counts and averages
            year_key = (category, band, bedroom_size)
            if year_key not in year_counts:
                year_counts[year_key] = 0
            year_counts[year_key] += 1
            if year_key not in year_averages:
                year_averages[year_key] = 0
            year_averages[year_key] += 1 / num_years

            # Update the month counts and averages
            month_key = (category, band, bedroom_size)
            if month_key not in month_counts:
                month_counts[month_key] = 0
            month_counts[month_key] += 1
            if month_key not in month_averages:
                month_averages[month_key] = 0
            month_averages[month_key] += 1 / (num_years * 12)

        return year_counts, year_averages, month_counts, month_averages


    @classmethod
    def generateApplicationsBasedOnAverage(cls, year_average, month_average, startDate, endDate):
        # List of all categories
        categories = ['Decants', 'FirstTimeApplicant', 'HomeScheme', 'Homeless', 'SocialServicesQuota', 'Downsizer', 'Transfer', 'TenantFinder', 'PanelMoves', 'Other']
        bands = ["Band 1", "Band 2", "Band 3", "Band 4", "Band 5"]

        # Generate applications for each category and band combination
        for category in categories:
            for band in bands:
                for bedroom_size in range(1, 5):
                    # Get the average number of applications per year and per month for this category, band, and bedroom size combination
                    year_average_count = year_average.get((category, band, bedroom_size), 0)
                    # print(year_average_count)
                    month_average_count = month_average.get((category, band, bedroom_size), 0)

                    # Generate applications based on the average counts
                    for i in range(int(year_average_count)):
                        # Set the application ID as the current timestamp plus a unique identifier
                        timestamp = int(datetime.datetime.now().timestamp() * 1000)
                        unique_id = len(cls.instances) + 1
                        application_id = f"{timestamp}-{unique_id}"

                        # Set the start date as a random date within the simulation startDate and endDate
                        # Compute the Unix timestamps for the start and end dates
                        start_timestamp = datetime.datetime.combine(startDate, datetime.time.min).timestamp()
                        end_timestamp = datetime.datetime.combine(endDate, datetime.time.max).timestamp()

                        # Generate a random Unix timestamp between the start and end dates
                        random_timestamp = random.uniform(start_timestamp, end_timestamp)

                        # Convert the random Unix timestamp to a datetime object
                        start_date = datetime.datetime.fromtimestamp(random_timestamp)
                        start_date_str = start_date.strftime('%Y-%m-%d %H:%M:%S')

                        # Create the application instance
                        generated_application = cls(application_id, band, category, bedroom_size, start_date_str)
                        # Applications.instances.append(generated_application)

    @classmethod
    def getResolvedInformation(cls):
        categories = {}
        band = {}
        bedroom = {}
        # Find number of applications in each category
        for instance in cls.resolved:
            # Update the categories dictionary
            category = instance.Category
            if category in categories:
                categories[category] += 1
            else:
                categories[category] = 1

            # Update the band dictionary
            band_val = instance.Band
            if band_val in band:
                band[band_val] += 1
            else:
                band[band_val] = 1

            # Update the bedroom dictionary
            bedroom_val = instance.BedroomSize
            if bedroom_val in bedroom:
                bedroom[bedroom_val] += 1
            else:
                bedroom[bedroom_val] = 1

        return categories, band, bedroom

    @classmethod
    def getAllApplicationInformation(cls):
        categories = {}
        band = {}
        bedroom = {}

        all_application = cls.resolved + cls.instances
        # Find number of applications in each category
        for instance in all_application:
            # Update the categories dictionary
            category = instance.Category
            if category in categories:
                categories[category] += 1
            else:
                categories[category] = 1

            # Update the band dictionary
            band_val = instance.Band
            if band_val in band:
                band[band_val] += 1
            else:
                band[band_val] = 1

            # Update the bedroom dictionary
            bedroom_val = instance.BedroomSize
            if bedroom_val in bedroom:
                bedroom[bedroom_val] += 1
            else:
                bedroom[bedroom_val] = 1

        return categories, band, bedroom

    @classmethod
    def findTimeRange(cls):
        all_applications = cls.resolved + cls.instances + cls.historical
        if len(all_applications) == 0:
            return None, None
        earliest_date = all_applications[0].StartDate
        latest_date = all_applications[0].StartDate
        for application in all_applications:
            if application.StartDate < earliest_date:
                earliest_date = application.StartDate
            if application.StartDate > latest_date:
                latest_date = application.StartDate
        return earliest_date, latest_date
