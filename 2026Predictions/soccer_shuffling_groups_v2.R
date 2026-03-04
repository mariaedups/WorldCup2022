library(readr)
library(dplyr)

# Run code to get qualified teams
# source('./qualifiers.R')

# Putting teams in their respective pots

# Hosts go to pot 1
hosts <- c('United States', 'Mexico', 'Canada')

qualified_teams$pot <- rep(NA, 48)

# Give the hosts some advantage so they are on the top
qualified_teams[qualified_teams$country %in% hosts,]$score <- qualified_teams[qualified_teams$country %in% hosts,]$score + 2000
qualified_teams <- qualified_teams %>% arrange(-score)

qualified_teams[1:12,]$pot <- 1
qualified_teams[13:24,]$pot <- 2
qualified_teams[25:36,]$pot <- 3
qualified_teams[37:48,]$pot <- 4

qualified_teams$group <- rep(NA, 48)

draw_group <- function(qualified_teams){

  # Starting with pot 1

  # Allocating hosts to specific groups (e.g., A, B, C or 1, 2, 3)
  qualified_teams[qualified_teams$country == hosts[1],]$group <- 1
  qualified_teams[qualified_teams$country == hosts[2],]$group <- 2
  qualified_teams[qualified_teams$country == hosts[3],]$group <- 3
  qualified_teams <- qualified_teams %>% arrange(-score)

  # Sampling who is going to group D - L (groups 4 - 12)
  order_allocation <- sample(4:12, size = 9, rep = FALSE)

  # i goes from 4 to 12 since first 3 are hosts
  for(i in 4:12){
    qualified_teams[i,]$group <- order_allocation[i-3]
  }

  # Moving to pots 2 to 4

  for(selected_pot in 2:4){

    order_allocation <- sample(1:12, size = 12, rep = FALSE)

    for(i in 1:12){

      cols <- c('j', 'count_countries_from_pot_x_in_group')

      # Initialize our data.frame:
      df_cnt <- data.frame(matrix(NA,
                                   nrow = 1,
                                   ncol = length(cols)))
      names(df_cnt) <- cols

      for(j in 1:12){

        list_count <- (qualified_teams %>% filter(pot == selected_pot) %>% .$group) == j
        list_count[is.na(list_count)] <- FALSE
        count_countries_from_pot_x_in_group <- sum(list_count)
        df_cnt <- rbind(df_cnt,cbind(j,count_countries_from_pot_x_in_group))

      }

      df_cnt <- na.omit(df_cnt)

      # The goal is to always select the min group that has cnt = 0 (e.g. still doesn't have countries from the selected pot)
      group_selected <- min(df_cnt %>% filter(count_countries_from_pot_x_in_group == 0) %>% .$j)

      # if(jumps == 0) {
      #   group_selected <- i
      # } else {
      #   group_selected <- i - jumps
      # }

      team_selected <- order_allocation[i]

      # Check where which team would be added to this group
      team_selected_df <- qualified_teams %>% filter(pot == selected_pot)
      team_selected_line <- team_selected_df[team_selected,]

      # Check how many teams we already have from that confederation in this group
      count <- nrow(qualified_teams %>% filter(group == group_selected & confederation == team_selected_line$confederation))

      # If the confederation is UEFA and the count is 2, we can't put that team in that group
      if(team_selected_line$confederation == 'UEFA' & count == 2){

        next_group <- group_selected

        # We need to keep searching for either when group is full or when the conditions are not met
        while(nrow(qualified_teams %>% filter(group == next_group)) == 4 | count >= 2){
          next_group <- next_group + 1

          if(next_group > 12) break

          count <- nrow(qualified_teams %>% filter(group == next_group & confederation == team_selected_line$confederation))
        }

        # We then know the team should go to the variable next group
        qualified_teams[qualified_teams$country == team_selected_line$country,]$group <- next_group


      }

      # If the continent is not Europe and the count is 1, we can't put that team in that group
      if(team_selected_line$confederation != 'UEFA' & count == 1){

        next_group <- group_selected

        # We need to keep searching for either when group is full or when the conditions are not met
        while(nrow(qualified_teams %>% filter(group == next_group)) == 4 | count >= 1){
          next_group <- next_group + 1

          if(next_group > 12) break

          count <- nrow(qualified_teams %>% filter(group == next_group & confederation == team_selected_line$confederation))
        }

        # Need to create condition for when next group > 12

        # We then know the team should go to the variable next group
        qualified_teams[qualified_teams$country == team_selected_line$country,]$group <- next_group


      } else {

      # If everything is ok, we can run the line below and allocate
      qualified_teams[qualified_teams$country == team_selected_line$country,]$group <- group_selected


      }


    }

  }

  # Fix the advantage we had previously added to the hosts
  qualified_teams[qualified_teams$country %in% hosts,]$score <- qualified_teams[qualified_teams$country %in% hosts,]$score - 2000

  return(qualified_teams)

}


get_n_groups <- function(qualified_teams,n){
  n_groups <- 0
  cols <- c('country', 'score','continent','confederation','pot','group','simulation')

  # Initialize our data.frame:
  df_final <- data.frame(matrix(NA,
                              nrow = 1,
                              ncol = length(cols)))
  names(df_final) <- cols

  while(n_groups < n){

    df <- draw_group(qualified_teams)

    check <- df %>% group_by(group) %>% summarize(cnt = n()) %>%
      mutate(cnt_check = ifelse(cnt == 4,1,0)) %>% ungroup %>%
      summarize(sum_cnt = sum(as.numeric(cnt_check))) %>% .$sum_cnt

    print(check)

    if((sum(df$group > 12) != 0) | (check != 12)) {
      n_groups <- n_groups
    } else {
      n_groups <- n_groups + 1
      df$simulation <- rep(n_groups, 48)
      df_final <- rbind(df_final,df)
    }

  }

  df_final <- na.omit(df_final)
  return(df_final)
}

teams <- get_n_groups(qualified_teams,20)
write.csv(teams, 'group_df.csv', row.names = FALSE)
