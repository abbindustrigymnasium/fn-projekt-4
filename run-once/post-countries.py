import requests
# Might need to install requests
# Only run once with countries.ts running
# This adds all countries in countries.csv to our database
# If you run multiple times you will get copies of every country

URL = "http://localhost:3000/countries"
with open("../data/countries.csv", "r") as f:
    for line in f.read().splitlines()[1:]:
        line = line.split(',')
        PARAMS = {
            "countryName": line[0],
            "waterQuality": int(line[1]),
            "waterComsumption": int(line[2]),
        }
        r = requests.post(url = URL, json = PARAMS)