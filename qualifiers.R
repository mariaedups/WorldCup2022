path <- './'
# Get the FIFA 2021 scores from the teams with the confederations
library(dplyr)

fifa_data <- read.csv(paste0(path,'fifa_rankings_2021.csv'))

# Host countries
hosts <- c('United States', 'Mexico', 'Canada')

# Filter for the best teams of each confederation according to 2026 quotas
# 2026 Quotas (48 teams):
# UEFA: 16
# CONMEBOL: 6
# AFC: 8
# CAF: 9
# CONCACAF: 6 (including hosts)
# OFC: 1
# Plus 2 teams from intercontinental playoffs (from AFC, CAF, CONCACAF, CONMEBOL, OFC)

uefa <- fifa_data %>% filter(confederation == 'UEFA') %>% head(16)
conmebol <- fifa_data %>% filter(confederation == 'CONMEBOL') %>% head(6)
afc <- fifa_data %>% filter(confederation == 'AFC') %>% head(8)
caf <- fifa_data %>% filter(confederation == 'CAF') %>% head(9)

# For CONCACAF, we need to make sure the 3 hosts are included, and then the next 3 best
concacaf_hosts <- fifa_data %>% filter(country %in% hosts)
concacaf_others <- fifa_data %>% filter(confederation == 'CONCACAF' & !country %in% hosts) %>% head(3)
concacaf <- rbind(concacaf_hosts, concacaf_others)

ofc <- fifa_data %>% filter(confederation == 'OFC') %>% head(1)

# Get the qualified teams and think about intercontinental playoffs
# We need to take the next best team from each eligible confederation (excluding UEFA)
playoff_candidates <- rbind(
  fifa_data %>% filter(confederation == 'CONMEBOL') %>% slice(7),
  fifa_data %>% filter(confederation == 'AFC') %>% slice(9),
  fifa_data %>% filter(confederation == 'CAF') %>% slice(10),
  fifa_data %>% filter(confederation == 'CONCACAF' & !country %in% hosts) %>% slice(4), # 4th best non-host CONCACAF team
  fifa_data %>% filter(confederation == 'CONCACAF' & !country %in% hosts) %>% slice(5), # CONCACAF gets 2 playoff spots
  fifa_data %>% filter(confederation == 'OFC') %>% slice(2)
)

intercontinental_playoffs <- playoff_candidates %>% filter(!is.na(country)) %>% arrange(-score)

selected_playoffs <- head(intercontinental_playoffs, 2)

qualified_teams <- rbind(
  uefa,
  conmebol,
  afc,
  caf,
  concacaf,
  ofc,
  selected_playoffs
)

write.csv(qualified_teams,paste0(path,'qualified_teams.csv'),row.names = FALSE)


