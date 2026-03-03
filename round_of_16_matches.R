path <- './'

library(dplyr)

round_32_preds <- read.csv(paste0(path,'round_32_match_predictions.csv'))

# Now Round 16 comes from Round of 32 winners
# Winner of Match 1 plays Winner of Match 2, etc.

cols <- c('team', 'group_team','rank_team', 'opp_team','group_opp_team','rank_opp','match_num','simulation') 

df_matches <- data.frame(matrix(NA,
                                    nrow = 1,                        
                                    ncol = length(cols))) 
names(df_matches) <- cols

df_matches_final <- data.frame(matrix(NA,
                                nrow = 1,                        
                                ncol = length(cols))) 
names(df_matches_final) <- cols

n_matches <- 8 
n_simulations <- max(round_32_preds$simulation)

for(j in 1:n_simulations) {

  # Filter round of 32 results for winners in this simulation
  # Find who scored more goals in each match
  matches_simulation <- round_32_preds %>% filter(simulation == j) %>%
    mutate(winner = ifelse(predictions_sim > pred_for_opp_team, team, opp_team),
           winner_group = ifelse(predictions_sim > pred_for_opp_team, group_team, group_opp_team),
           winner_rank = ifelse(predictions_sim > pred_for_opp_team, rank_team, rank_opp)) %>%
    # Remove duplicates because we have 2 rows per match
    distinct(match_num, winner, .keep_all = TRUE) %>% arrange(match_num)

  for(i in 1:n_matches){
  
    df_matches[i,]$team <- matches_simulation[2*i - 1,]$winner
    df_matches[i,]$group_team <- matches_simulation[2*i - 1,]$winner_group
    df_matches[i,]$rank_team <- matches_simulation[2*i - 1,]$winner_rank
    
    df_matches[i,]$opp_team <- matches_simulation[2*i,]$winner
    df_matches[i,]$group_opp_team <- matches_simulation[2*i,]$winner_group
    df_matches[i,]$rank_opp <- matches_simulation[2*i,]$winner_rank
    
    df_matches[i,]$match_num <- i
    df_matches[i,]$simulation <- j
    
  }

  df_matches_final <- rbind(df_matches_final,df_matches)

}

df_matches_final <- na.omit(df_matches_final)

write.csv(df_matches_final,paste0(path,'matches_round_of_16.csv'),row.names = FALSE)

# Table + rpois again 
# We can use df_clean since we already did source(simulation.R), but remember to change stage_num to 2

# Finish loop for round of 16 phase 

# (...)