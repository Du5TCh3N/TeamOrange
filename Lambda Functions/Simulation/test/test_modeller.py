import datetime
from unittest import TestCase

from application import Application
from modeller import resolveApplication
from property import Property


class TestModeller(TestCase):

    def test_resolve_application(self):
        newTestProperty = Property(3, "Decants", datetime.datetime(2023, 3, 3, 12, 3, 30))
        instancePropList = [newTestProperty]
        Property.createInstances(instancePropList)

        assert Property.getAllProperties() == instancePropList

        newTestApplication = Application("Test-1", "Band 1", "Decants", 3, "2023-03-25 00:00:00")
        instanceAppList = [newTestApplication]
        Application.createApplicationInstances(instanceAppList)

        assert Application.getAllApplications() == instanceAppList

        currentDate = datetime.datetime.now()
        resolved = resolveApplication(currentDate)

        assert resolved == 1