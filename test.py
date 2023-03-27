from datetime import datetime
from dateutil import tz

id = 'CategoryComparisonRadarchart'  # Set the id to any value you like
__typename = 'RadarchartData'
total = [100, 7, 11, 3, 5, 1, 100, 39, 11, 16]
value = [50, 2, 2, 2, 5, 1, 75, 20, 3, 4]
createdAt = datetime.now(tz.UTC).isoformat()
updatedAt = datetime.now(tz.UTC).isoformat()
_version = 1
_lastChangedAt = int(datetime.now(tz.UTC).timestamp() * 1000)

print(__typename)
print(createdAt)
print(updatedAt)
print(_version)
print(_lastChangedAt)

categories = ["Decants", "PanelMoves", "Homeless", "SocialServicesQuota", "Transfer", "HomeScheme",
                      "FirstTimeApplicants", "TenantFinder", "Downsizer"]
print(len(categories))
