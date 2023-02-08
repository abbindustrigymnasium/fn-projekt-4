import requests
# Might need to install requests
# Only run once with continents.ts running
# This adds all continents in continents.csv to our database
# If you run multiple times you will get copies of every country

URL = "http://localhost:3000/continents"
with open("../data/continents.csv", "r") as f:
    for line in f.read().splitlines()[1:]:
        line = line.split(',')
        PARAMS = {
            "continentName": line[0],
            "waterQuality": int(line[1]),
            "waterComsumption": int(line[2]),
        }
        r = requests.post(url = URL, json = PARAMS)