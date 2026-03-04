path <- './'

library(dplyr)

countries_on_round_32 <- read.csv(paste0(path,'classification_round_32.csv'))

# Create a bracket for the round of 32
# Since we have 12 groups, the top 2 teams and best 8 3rd placed teams advance (32 teams)
# We will use a standard deterministic bracket pairing 1st place teams against 2nd or 3rd place teams

cols <- c('team', 'group_team','rank_team', 'opp_team','group_opp_team','rank_opp','match_num','simulation')

df_matches <- data.frame(matrix(NA,
                                    nrow = 1,
                                    ncol = length(cols)))
names(df_matches) <- cols

df_matches_final <- data.frame(matrix(NA,
                                nrow = 1,
                                ncol = length(cols)))
names(df_matches_final) <- cols

n_matches <- 16
n_simulations <- max(countries_on_round_32$simulation)

# Because we need exactly 32 teams for each simulation
for(j in 1:n_simulations) {
  matches_simulation <- countries_on_round_32 %>% arrange(simulation, -points, diff_goals) %>% filter(simulation == j)

  # Split teams into top 16 and bottom 16
  # A simple pairing is Team 1 vs Team 32, Team 2 vs Team 31, etc.

  for(i in 1:n_matches){
    team_a <- matches_simulation[i, ]
    team_b <- matches_simulation[33-i, ]

    df_matches[i,]$team <- team_a$country
    df_matches[i,]$group_team <- team_a$group
    df_matches[i,]$rank_team <- team_a$rank

    df_matches[i,]$opp_team <- team_b$country
    df_matches[i,]$group_opp_team <- team_b$group
    df_matches[i,]$rank_opp <- team_b$rank

    df_matches[i,]$match_num <- i
    df_matches[i,]$simulation <- j
  }

  df_matches_final <- rbind(df_matches_final,df_matches)
}

df_matches_final <- na.omit(df_matches_final)

write.csv(df_matches_final,paste0(path,'matches_round_of_32.csv'),row.names = FALSE)
