import datetime
from unittest import TestCase

from application import Application


class TestApplication(TestCase):

    def setUp(self) -> None:
        self.testApplication1 = Application("Test-1", "Band 1", "Decants", 1, "2023-03-25 00:00:00")
        self.testApplication2 = Application("Test-2", "Band 1", "Decants", 1, "2023-03-25 00:00:00")
        self.list_of_applications = [self.testApplication1, self.testApplication2]

    def tearDown(self) -> None:
        Application.clearApplicationInstances()
        Application.removeApplication(self.testApplication1)
        Application.removeApplication(self.testApplication2)

    def test_to_string(self):
        assert str(self.testApplication1) == "ApplicationID: Test-1, Band: Band 1, Category: Decants, " \
                                             "BedroomSize: 1, StartDate: 2023-03-25 00:00:00"

    def test_get_all_applications(self):
        assert Application.getAllApplications() == self.list_of_applications

    def test_get_num_applications(self):
        assert Application.getNumApplications() == len(self.list_of_applications)

    def test_check_existence(self):
        assert Application.checkExistence(self.testApplication1)

    def test_check_existence_fail(self):
        assert not Application.checkExistence("Not a Application")

    def test_get_applications_by_band(self):
        assert Application.getApplicationsByBand("Band 1") == self.list_of_applications

    def test_get_applications_by_size(self):
        assert Application.getApplicationsBySize(1) == self.list_of_applications

    def test_get_applications_by_category(self):
        assert Application.getApplicationsByCategory("Decants") == self.list_of_applications

    def test_get_number_of_applications_by_category(self):
        assert Application.getNumberOfApplicationsByCategory("Decants") == len(self.list_of_applications)

    def test_get_applications_by_date(self):
        testDate = datetime.datetime(year=2023, month=3, day=25)
        assert Application.getApplicationsByDate(testDate) == self.list_of_applications

    def test_get_number_of_applications_by_date(self):
        testDate = datetime.datetime(year=2023, month=3, day=25)
        assert Application.getNumberOfApplicationsByDate(testDate) == len(self.list_of_applications)

    def test_get_applications_before_date(self):
        testDate = datetime.datetime(year=2023, month=3, day=26)
        assert Application.getApplicationsBeforeDate(testDate) == self.list_of_applications

    def test_get_number_of_applications_before_date(self):
        testStartDate = datetime.datetime(year=2023, month=3, day=24)
        testEndDate = datetime.datetime(year=2023, month=3, day=26)
        assert Application.getNumberOfApplicationsBetweenDate(testEndDate, testStartDate) == \
               len(self.list_of_applications)

    def test_get_applications_by_size_and_category(self):
        testDate = datetime.datetime(year=2023, month=3, day=25)
        self.testApplication3 = Application("Test-3", "Band 2", "Decants", 1, "2023-03-25 00:00:00")
        self.testApplication4 = Application("Test-4", "Band 3", "Decants", 1, "2023-03-25 00:00:00")

        test_banded_applications = {
            "Band 1": [self.testApplication1, self.testApplication2],
            "Band 2": [self.testApplication3],
            "Band 3": [self.testApplication4]
        }

        assert Application.getApplicationsBySizeAndCategory(1, "Decants", testDate) == test_banded_applications

    def test_find_priority(self):
        testDate = datetime.datetime(year=2023, month=3, day=25)
        candidate = Application.findPriority(1, "Decants", testDate)
        assert candidate == self.testApplication1

    def test_remove_application(self):
        Application.removeApplication(self.testApplication1)
        assert Application.getNumApplications() == len(self.list_of_applications) - 1
        assert Application.getResolvedNumberApplications() == 1

    def test_update_waiting_time(self):
        testDate = datetime.datetime(year=2023, month=3, day=26)
        Application.updateWaitingTime(testDate)
        assert self.testApplication1.WaitTime == 1
        assert self.testApplication2.WaitTime == 1

    def test_get_average_waiting_time(self):
        testDate = datetime.datetime(year=2023, month=3, day=26)
        Application.updateWaitingTime(testDate)
        assert Application.getAverageWaitingTime() == 1

    def test_get_average_waiting_time_return_zero(self):
        Application.clearApplicationInstances()
        assert Application.getAverageWaitingTime() == 0

    def test_get_average_waiting_time_for_category(self):
        testDate = datetime.datetime(year=2023, month=3, day=26)
        Application.updateWaitingTime(testDate)
        assert Application.getAverageWaitingTimeForCategory("Decants") == 1

    def test_historical_analysis(self):
        testDate = datetime.datetime(year=2023, month=3, day=31)
        expected = ({2023: {('Decants', 'Band 1', 1): 10},
                     2022: {('Decants', 'Band 2', 1): 1},
                     2021: {('Decants', 'Band 3', 1): 1}},
                    {2023: {3: {('Decants', 'Band 1', 1): 10}},
                     2022: {3: {('Decants', 'Band 2', 1): 1}},
                     2021: {3: {('Decants', 'Band 3', 1): 1}}})
        assert Application.historicalAnalysis(testDate) == expected

    def test_find_historical_category_average(self):
        testDate = datetime.datetime(year=2023, month=3, day=31)
        historical_analysis = Application.historicalAnalysis(testDate)
        expected = (6.0, 6.0)
        assert Application.findHistoricalCategoryAverage(historical_analysis[0],
                                                         historical_analysis[1],
                                                         "Decants") == expected

    def test_find_historical_band_average(self):
        testDate = datetime.datetime(year=2023, month=3, day=31)
        historical_analysis = Application.historicalAnalysis(testDate)
        expected = (2.0, 2.0)
        assert Application.findHistoricalBandAverage(historical_analysis[0],
                                                     historical_analysis[1],
                                                     "Band 1") == expected

    def test_find_historical_bedroom_average(self):
        testDate = datetime.datetime(year=2023, month=3, day=31)
        historical_analysis = Application.historicalAnalysis(testDate)
        expected = (4.0, 4.0)
        assert Application.findHistoricalBedroomAverage(historical_analysis[0],
                                                        historical_analysis[1],
                                                        1) == expected

    def test_find_historical_combination_average(self):
        testDate = datetime.datetime(year=2023, month=3, day=31)
        self.testApplication3 = Application("Test-3", "Band 2", "Decants", 1, "2022-03-25 00:00:00")
        self.testApplication4 = Application("Test-4", "Band 3", "Decants", 1, "2021-03-25 00:00:00")
        historical_analysis = Application.historicalAnalysis(testDate)
        year_average = ({('Decants', 'Band 2', 1): 1, ('Decants', 'Band 3', 1): 1},
                        {('Decants', 'Band 2', 1): 0.5, ('Decants', 'Band 3', 1): 0.5},
                        {('Decants', 'Band 2', 1): 1, ('Decants', 'Band 3', 1): 1},
                        {('Decants', 'Band 2', 1): 0.041666666666666664, ('Decants', 'Band 3', 1): 0.041666666666666664})
        assert Application.findHistoricalCombinationAverage(historical_analysis[0]) == year_average

    def test_generate_applications_based_on_average(self):
        # Set start date for the test as 1st Jan 2021
        startDate = datetime.datetime(year=2021, month=1, day=1)
        # Set the end date for the test as today
        endDate = datetime.datetime.today()
        # Add two additional applications on top of the two in the setUp function
        self.testApplication3 = Application("Test-3", "Band 2", "Decants", 1, "2022-03-25 00:00:00")
        self.testApplication4 = Application("Test-4", "Band 3", "Decants", 1, "2021-03-25 00:00:00")
        # Get the historical analysis (yearly and monthly analysis)
        # from the max date of the applications to the start date provided
        historical_analysis = Application.historicalAnalysis(startDate)
        # Use the yearly analysis to generate additional applications between the start and end date
        yearly_average = historical_analysis[0]
        Application.generateApplicationsBasedOnAverage(yearly_average, startDate, endDate)
        # Check the new generated applications have been added to the instances list
        assert not Application.getNumApplications() == len(self.list_of_applications)

    def test_get_all_application_information(self):
        info = ({'Decants': 2}, {'Band 1': 2}, {1: 2})
        assert Application.getAllApplicationInformation() == info

    def test_find_time_range(self):
        self.testApplication3 = Application("Test-3", "Band 2", "Decants", 1, "2022-03-25 00:00:00")
        self.testApplication4 = Application("Test-4", "Band 3", "Decants", 1, "2021-03-25 00:00:00")
        expected = (datetime.datetime(2021, 3, 25, 0, 0), datetime.datetime(2023, 3, 25, 0, 0))
        assert Application.findTimeRange() == expected
