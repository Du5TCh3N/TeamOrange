import datetime
from unittest import TestCase

from property import Property


class TestProperty(TestCase):
    def setUp(self) -> None:
        self.testProperty = Property(1, "Decants", "2023-01-01 00:00:00")

    def tearDown(self) -> None:
        Property.deleteProperty(self.testProperty)

    def test_get_size(self):
        assert self.testProperty.getSize() == 1

    def test_get_category(self):
        assert self.testProperty.getCategory() == "Decants"

    def test_to_string(self):
        current_id = Property.id_counter
        assert str(self.testProperty) == f"PropertyID: {current_id - 1}, Category: Decants, BedroomSize: 1, " \
                                         "ReleaseDate: 2023-01-01 00:00:00"


class TestClassProperty(TestCase):
    def setUp(self) -> None:
        self.testProperty1 = Property(1, "Decants", "2023-01-01 00:00:00")
        self.testProperty2 = Property(1, "Decants", "2023-01-01 00:00:00")
        self.list_of_properties = [self.testProperty1, self.testProperty2]

    def tearDown(self) -> None:
        Property.clearInstances()

    def test_get_all_properties(self):
        assert self.list_of_properties == Property.getAllProperties()

    def test_get_num_properties(self):
        assert Property.getNumProperties() == 2

    def test_get_properties_by_room_size(self):
        assert Property.getPropertiesByRoomSize(1) == self.list_of_properties

    def test_get_properties_by_category(self):
        assert Property.getPropertiesByCategory("Decants") == self.list_of_properties

    def test_get_number_of_properties_by_category(self):
        assert Property.getNumberOfPropertiesByCategory("Decants") == len(self.list_of_properties)

    def test_get_properties_by_date(self):
        testDate = datetime.datetime(year=2023, month=1, day=1)
        assert Property.getPropertiesByDate(testDate) == self.list_of_properties

    def test_generate_properties(self):
        Property.generateProperties(1, "Decants", "2023-01-01 00:00:00", 5)
        assert Property.getNumProperties() == 7

    def test_assign_property_fail(self):
        assignedProperty = Property.assignProperty(3, "Homeless")
        assert assignedProperty is None

    def test_assign_property_success(self):
        assignedProperty = Property.assignProperty(1, "Decants")
        assert assignedProperty == self.testProperty1 or assignedProperty == self.testProperty2
