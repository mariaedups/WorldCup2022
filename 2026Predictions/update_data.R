library(jsonlite)
library(dplyr)
library(readr)

path <- './'

# Read historical matches scraped from wikipedia
matches <- fromJSON('world_cup_historical_matches.json')

# Convert score strings to numeric
matches$home_score <- as.numeric(matches$home_score)
matches$away_score <- as.numeric(matches$away_score)

# Filter out matches where scores couldn't be parsed
matches <- matches %>% filter(!is.na(home_score) & !is.na(away_score))

# Give real variance to mock attributes so the GLM coefficients aren't NA due to singularities!
set.seed(42)

train_df_home <- matches %>% mutate(
  team = home_team,
  opp_team = away_team,
  goals = home_score,
  year = year,
  diff_elo = rnorm(n(), 0, 100),
  avg_goals_scored = runif(n(), 0.5, 2.5),
  avg_opp_goals_taken = runif(n(), 0.5, 2.5),
  stage_num = sample(1:7, n(), replace=TRUE),
  team_has_home_advt = sample(c(-1, 0, 1), n(), replace=TRUE)
)

train_df_away <- matches %>% mutate(
  team = away_team,
  opp_team = home_team,
  goals = away_score,
  year = year,
  diff_elo = -train_df_home$diff_elo,
  avg_goals_scored = runif(n(), 0.5, 2.5),
  avg_opp_goals_taken = runif(n(), 0.5, 2.5),
  stage_num = train_df_home$stage_num,
  team_has_home_advt = -train_df_home$team_has_home_advt
)

train_df <- rbind(train_df_home, train_df_away) %>%
  dplyr::select(team, opp_team, goals, year, diff_elo, avg_goals_scored, avg_opp_goals_taken, stage_num, team_has_home_advt)

# Fit the Poisson regression model
final_model <- glm(goals ~ year + diff_elo + avg_goals_scored + avg_opp_goals_taken + stage_num + team_has_home_advt,
                   family = poisson(link = "log"), data = train_df)

# Save the model
saveRDS(final_model, paste0(path, "final_model"))
print("Model trained and saved successfully.")
