import datetime
from unittest import TestCase

from application import Application


class TestApplication(TestCase):

    def setUp(self) -> None:
        self.testApplication1 = Application("Test-1", "Band 1", "Decants", 1, "2023-03-25")
        self.testApplication2 = Application("Test-2", "Band 1", "Decants", 1, "2023-03-25")
        self.list_of_applications = [self.testApplication1, self.testApplication2]

    def tearDown(self) -> None:
        Application.clearApplicationInstances()

    def test_to_string(self):
        print(str(self.testApplication1))
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
        self.testApplication3 = Application("Test-3", "Band 2", "Decants", 1, "2023-03-25")
        self.testApplication4 = Application("Test-4", "Band 3", "Decants", 1, "2023-03-25")

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
        expected = ({2023: {('Decants', 'Band 1', 1): 2}}, {2023: {3: {('Decants', 'Band 1', 1): 2}}})
        assert Application.historicalAnalysis(testDate) == expected

    def test_find_historical_category_average(self):
        testDate = datetime.datetime(year=2023, month=3, day=31)
        historical_analysis = Application.historicalAnalysis(testDate)
        expected = (2.0, 2.0)
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
        expected = (2.0, 2.0)
        assert Application.findHistoricalBedroomAverage(historical_analysis[0],
                                                        historical_analysis[1],
                                                        1) == expected

    def test_find_historical_combination_average(self):
        testDate = datetime.datetime(year=2023, month=3, day=31)
        self.testApplication3 = Application("Test-3", "Band 2", "Decants", 1, "2022-03-25")
        self.testApplication4 = Application("Test-4", "Band 3", "Decants", 1, "2021-03-25")
        historical_analysis = Application.historicalAnalysis(testDate)
        print(Application.findHistoricalCombinationAverage(historical_analysis[0]))
        assert Application.findHistoricalCombinationAverage(historical_analysis[0]) == ({}, {}, {}, {})

    def test_generate_applications_based_on_average(self):
        testDate = datetime.datetime(year=2023, month=3, day=31)
        self.testApplication3 = Application("Test-3", "Band 2", "Decants", 1, "2022-03-25")
        self.testApplication4 = Application("Test-4", "Band 3", "Decants", 1, "2021-03-25")
        historical_analysis = Application.historicalAnalysis(testDate)
        print(Application.generateApplicationsBasedOnAverage())

    def test_get_resolved_information(self):
        self.fail()

    def test_get_all_application_information(self):
        self.fail()

    def test_find_time_range(self):
        self.fail()
