# Predicting the FIFA World Cup 2026

This project proposes a holistic framework to simulate and predict the 2026 FIFA World Cup using Poisson Regressions and Monte Carlo simulations. The approach simulates the tournament from the qualifying stages through the group draws, and finally the knockout stages. By incorporating the uncertainty of the group draw into Monte Carlo simulations, it estimates the probabilities of each team advancing through the tournament.

This framework was originally built for the 2022 World Cup and has been updated to reflect the 2026 World Cup format, which includes 48 teams, 12 groups, and a new Round of 32 knockout stage.

For more details on the original methodology, data overview, and results, please refer to the detailed paper: [`A Holistic Approach Predicting the FIFA World Cup 2022.md`](A%20Holistic%20Approach%20Predicting%20the%20FIFA%20World%20Cup%202022.md).

## Project Structure and Execution Flow

The central orchestration script of the project is `00_main_code.R`. It executes the complete simulation pipeline by calling (sourcing) a series of specialized R scripts sequentially. Below is a detailed breakdown of how each R file interacts with the main file and each other.

### 1. Model Loading
*   The script begins by loading a pre-trained Poisson regression model (`final_model`). This model was previously trained (e.g., using a script like `model_with_2018.R`) on historical World Cup matches from 1960 to 2018 to predict the number of goals a team will score based on differences in Elo ratings, tournament stage, home advantage, and average goals.

### 2. Data Preparation
*   **`clean_elo.R` & `elo_2021.R`**: Clean and retrieve the Elo ratings for international soccer teams. Elo ratings are used as a significant predictor of match outcomes. (`elo_2021.R` sources `clean_elo.R` and outputs `elo_2021.csv`).
*   **`qualifiers.R`**: Determines the 48 teams that qualify for the World Cup based on their FIFA rankings and confederation quotas. It outputs `qualified_teams.csv`.
*   **`update_model.py`**: Scrapes the match results from the 2022 World Cup to append to the historical data, used for retraining the Poisson model.

### 3. Group Draw Simulation
*   **`soccer_shuffling_groups_v2.R`**: Simulates the official FIFA group draw process using Monte Carlo methods. It splits the qualified teams into 4 pots of 12 based on rankings and randomly assigns them to 12 Groups while adhering to FIFA's geographic constraints. It generates `n` possible group allocations and outputs `group_df.csv`.

### 4. Group Stage
*   **`group_matches.R`**: Takes the simulated group allocations and organizes the 144 group stage matches. It merges these matchups with team data (Elo scores, historical goal averages) to prepare the test dataframe (`df_group_phase.csv`) for the prediction model.
*   **`group_match_predictions.R`**: Uses the loaded Poisson regression model to predict the number of goals scored by each team in the simulated group matches. It outputs the predictions to `winner_pred_df.csv`.
*   **`classification_round_32.R`**: Analyzes the predicted group stage results. It calculates points for each match (3 for a win, 1 for a draw), applies tie-breaking rules, and identifies the top 2 teams from each group plus the 8 best 3rd-placed teams who will advance to the Round of 32. It saves these standings in `classification_round_32.csv`.

### 5. Knockout Stages (Round of 32, Round of 16, Quarter-finals, Semi-finals)
The knockout stages follow a repeating three-step pipeline for each round:
*   **Match Setup**: Generates the match pairings based on the results of the previous round.
    *   `round_of_32_matches.R` -> `matches_round_of_32.csv`
    *   `round_of_16_matches.R` -> `matches_round_of_16.csv`
    *   `quarter_final_matches.R` -> `quarter_matches.csv`
    *   `semi_final_matches.R` -> `matches_semi.csv`
*   **Data Preparation (Test DF)**: Merges the match pairings with team data to prepare the inputs for the predictive model.
    *   `round_of_32_test_df.R` -> `df_test_round_32.csv`
    *   `round_of_16_test_df.R` -> `df_test_round_16.csv`
    *   `quarter_finals_test_df.R` -> `df_test_quarter_finals.csv`
    *   `semi_final_test_df.R` -> `df_test_semi.csv`
*   **Prediction**: Uses the Poisson model to predict the outcomes and determine which teams advance.
    *   `round_of_32_predict.R` -> `round_32_match_predictions.csv`
    *   `round_of_16_predict.R` -> `round_16_match_predictions.csv`
    *   `quarter_finals_predict.R` -> `quarter_final_match_predictions.csv`
    *   `semi_final_predict.R` -> `semi_final_match_predictions.csv`

### 6. Finals and Third-Place Matches
*   **`final_and_third_matches.R`**, **`final_and_third_test_df.R`**, **`final_and_third_predict.R`**: These scripts perform the exact same three-step process (Setup, Data Prep, Prediction) for the final match (winners of semi-finals) and the third-place playoff (losers of semi-finals).

### 7. Results and Analytics
*   **`ranking.R`**: Summarizes the final results of each Monte Carlo simulation. It calculates the overall winner, runner-up, third place, and fourth place for each simulated tournament. Outputs `ranking.csv` and `champions.csv`.
*   **`analytics.R`**: Analyzes the outcomes across all `n` simulations. It calculates the empirical probability of each of the 48 teams reaching the Round of 32, Round of 16, Quarter-finals, Semi-finals, Finals, and winning the World Cup. It outputs a comprehensive probability table (`ordered_df.csv`).

## Usage
1. Make sure to have the required raw data files (e.g., `fifa_rankings_2021.csv`, `raw_data/elo_rankings_raw_year_bf.csv`, and the `final_model` object).
2. Adjust the absolute `path` variable at the top of the R scripts (or particularly in `00_main_code.R`) to match your local project directory.
3. Run `00_main_code.R` to execute the entire simulation end-to-end.
