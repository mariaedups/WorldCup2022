path <- './'
# Get the FIFA 2021 scores from the teams with the confederations
library(dplyr)

fifa_data <- read.csv(paste0(path,'fifa_rankings_2021.csv'))

# Known qualified teams as of March 2026
known_qualified <- c(
  'Canada', 'Mexico', 'United States', 'Japan', 'New Zealand', 'Iran', 'Argentina',
  'Uzbekistan', 'South Korea', 'Jordan', 'Australia', 'Brazil', 'Ecuador', 'Uruguay',
  'Colombia', 'Paraguay', 'Morocco', 'Tunisia', 'Egypt', 'Algeria', 'Ghana',
  'Cape Verde', 'South Africa', 'Qatar', 'England', 'Saudi Arabia', 'Ivory Coast',
  'Senegal', 'France', 'Croatia', 'Portugal', 'Norway', 'Germany', 'Netherlands',
  'Belgium', 'Austria', 'Switzerland', 'Spain', 'Scotland', 'Panama', 'Haiti', 'Curaçao'
)

# Standardize names to match fifa_data if possible
known_qualified[known_qualified == "South Korea"] <- "Korea Republic"
known_qualified[known_qualified == "Curaçao"] <- "Curacao"

# Ensure known qualified teams are selected first
qualified_teams_known <- fifa_data %>% filter(country %in% known_qualified)

# Remaining spots per confederation
# Total needed: UEFA(16), CONMEBOL(6), AFC(8), CAF(9), CONCACAF(6), OFC(1) = 46 + 2 playoff = 48
get_remaining <- function(confed, target_quota, current_selected) {
  current_count <- nrow(current_selected %>% filter(confederation == confed))
  needed <- target_quota - current_count
  if (needed > 0) {
    return(fifa_data %>% filter(confederation == confed & !(country %in% current_selected$country)) %>% head(needed))
  } else {
    return(fifa_data[0,])
  }
}

uefa_rem <- get_remaining('UEFA', 16, qualified_teams_known)
conmebol_rem <- get_remaining('CONMEBOL', 6, qualified_teams_known)
afc_rem <- get_remaining('AFC', 8, qualified_teams_known)
caf_rem <- get_remaining('CAF', 9, qualified_teams_known)
concacaf_rem <- get_remaining('CONCACAF', 6, qualified_teams_known)
ofc_rem <- get_remaining('OFC', 1, qualified_teams_known)

qualified_teams_direct <- rbind(
  qualified_teams_known, uefa_rem, conmebol_rem, afc_rem, caf_rem, concacaf_rem, ofc_rem
)

# Get the qualified teams and think about intercontinental playoffs
# We need to take the next best team from each eligible confederation (excluding UEFA)
playoff_candidates <- rbind(
  get_remaining('CONMEBOL', 7, qualified_teams_direct) %>% tail(1),
  get_remaining('AFC', 9, qualified_teams_direct) %>% tail(1),
  get_remaining('CAF', 10, qualified_teams_direct) %>% tail(1),
  get_remaining('CONCACAF', 8, qualified_teams_direct) %>% tail(2), # CONCACAF gets 2 playoff spots
  get_remaining('OFC', 2, qualified_teams_direct) %>% tail(1)
)

intercontinental_playoffs <- playoff_candidates %>% filter(!is.na(country)) %>% arrange(-score)

selected_playoffs <- head(intercontinental_playoffs, 2)

qualified_teams <- rbind(
  qualified_teams_direct,
  selected_playoffs
)

write.csv(qualified_teams,paste0(path,'qualified_teams.csv'),row.names = FALSE)
