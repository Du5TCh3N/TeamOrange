import datetime
from unittest import TestCase

from applications import Applications
from modeller import resolveApplication, Modeller
from property import Property


class TestModeller(TestCase):

    def test_resolve_application(self):
        newTestProperty = Property(3, "Decants", "2023-03-23 12:03:30")
        instancePropList = [newTestProperty]
        Property.createInstances(instancePropList)

        assert Property.getAllProperties() == instancePropList

        newTestApplication = Applications("Test-1", "Band 1", "Decants", 3, "2023-03-25")
        instanceAppList = [newTestApplication]
        Applications.createApplicationInstances(instanceAppList)

        assert Applications.getAllApplications() == instanceAppList

        currentDate = datetime.datetime.now()
        resolved = resolveApplication(currentDate)

        assert resolved == 1
