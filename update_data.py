import urllib.request
import ssl
import csv
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

print("Skipping Elo and FIFA real scrape as we don't have reliable code to map country codes, using provided static CSV files for the simulation.")
