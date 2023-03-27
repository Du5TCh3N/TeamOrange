from datetime import datetime
from dateutil import tz

id = 'year_barchart'  # Set the id to any value you like
__typename = 'BarchartData'
name = ['2017', '2018', '2019', '2020', '2021', '2022']
value = [390, 310, 309, 410, 384, 248]
createdAt = datetime.now(tz.UTC).isoformat()
updatedAt = datetime.now(tz.UTC).isoformat()
_version = 1
_lastChangedAt = int(datetime.now(tz.UTC).timestamp() * 1000)

print(__typename)
print(createdAt)
print(updatedAt)
print(_version)
print(_lastChangedAt)
