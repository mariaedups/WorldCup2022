import urllib.request
import json
from bs4 import BeautifulSoup
import re

url = "https://en.wikipedia.org/wiki/2022_FIFA_World_Cup"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read()
soup = BeautifulSoup(html, "html.parser")

matches = []
for div in soup.find_all("div", class_="footballbox"):
    th = div.find("th", class_="fhome")
    ta = div.find("th", class_="faway")
    score = div.find("th", class_="fscore")
    if th and ta and score:
        home_team = th.get_text(strip=True)
        away_team = ta.get_text(strip=True)
        match_score = score.get_text(strip=True)
        # remove a.e.t etc.
        match_score = match_score.split("(")[0].strip()
        if "–" in match_score:
            s1, s2 = match_score.split("–")
            matches.append({"home_team": home_team, "away_team": away_team, "home_score": s1, "away_score": s2})

with open("world_cup_2022_matches.json", "w") as f:
    json.dump(matches, f, indent=4)
print(f"Scraped {len(matches)} matches.")
