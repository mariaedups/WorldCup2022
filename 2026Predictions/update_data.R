library(jsonlite)
library(dplyr)
library(readr)

path <- './'

# Read historical matches scraped from wikipedia (pre-2022)
matches_hist <- fromJSON('world_cup_historical_matches.json')
# Read 2022 matches
matches_2022 <- fromJSON('world_cup_2022_matches.json')
matches_2022$year <- 2022

matches <- bind_rows(matches_hist, matches_2022)

# Convert score strings to numeric
matches$home_score <- as.numeric(matches$home_score)
matches$away_score <- as.numeric(matches$away_score)

# Filter out matches where scores couldn't be parsed
matches <- matches %>% filter(!is.na(home_score) & !is.na(away_score))

# Instead of mock attributes, merge with actual Elo data
source("clean_elo.R")
elo_raw <- read_csv('elo_rankings_raw_year_bf.csv')
elo_cleaned <- clean_elo(elo_raw)

# Clean up Year in elo_cleaned
elo_cleaned$Year <- as.numeric(gsub("X", "", elo_cleaned$Year))
elo_cleaned$elo_score <- as.numeric(elo_cleaned$elo_score)
elo_cleaned$num_matches <- as.numeric(elo_cleaned$num_matches)
elo_cleaned$goals_for <- as.numeric(elo_cleaned$goals_for)
elo_cleaned$goals_against <- as.numeric(elo_cleaned$goals_against)

elo_cleaned <- elo_cleaned %>%
  mutate(avg_goals = goals_for / num_matches,
         avg_goals_taken = goals_against / num_matches)

# Name alignment (some basic fixes for historical merging)
elo_cleaned$country_name[elo_cleaned$country_name == "South Korea"] <- "Korea Republic"

matches_home_elo <- left_join(matches, elo_cleaned, by = c("home_team" = "country_name", "year" = "Year"))
matches_away_elo <- left_join(matches_home_elo, elo_cleaned, by = c("away_team" = "country_name", "year" = "Year"), suffix = c("_home", "_away"))

train_df_home <- matches_away_elo %>% mutate(
  team = home_team,
  opp_team = away_team,
  goals = home_score,
  year = year,
  diff_elo = elo_score_home - elo_score_away,
  avg_goals_scored = avg_goals_home,
  avg_opp_goals_taken = avg_goals_taken_away,
  stage_num = sample(1:7, n(), replace=TRUE), # Keeping stage and home adv mocked or simplified if we don't have it scraped perfectly
  team_has_home_advt = sample(c(-1, 0, 1), n(), replace=TRUE)
)

train_df_away <- matches_away_elo %>% mutate(
  team = away_team,
  opp_team = home_team,
  goals = away_score,
  year = year,
  diff_elo = elo_score_away - elo_score_home,
  avg_goals_scored = avg_goals_away,
  avg_opp_goals_taken = avg_goals_taken_home,
  stage_num = train_df_home$stage_num,
  team_has_home_advt = -train_df_home$team_has_home_advt
)

train_df <- rbind(train_df_home, train_df_away) %>%
  dplyr::select(team, opp_team, goals, year, diff_elo, avg_goals_scored, avg_opp_goals_taken, stage_num, team_has_home_advt) %>%
  na.omit()

# Fit the Poisson regression model
final_model <- glm(goals ~ year + diff_elo + avg_goals_scored + avg_opp_goals_taken + stage_num + team_has_home_advt,
                   family = poisson(link = "log"), data = train_df)

# Save the model
saveRDS(final_model, paste0(path, "final_model"))
print("Model trained and saved successfully.")
