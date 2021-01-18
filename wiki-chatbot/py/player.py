import json
import MySQLdb
import MySQLdb.cursors
import time
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats

def _get_db():
    db = MySQLdb.connect(
            host="chatron.socs.uoguelph.ca",
            user="sysadmin",
            passwd="SublimeVarnish",
            db="NBA"
        )
    db.autocommit(True)
    return db

def _create_table(mydb):
    cursor = mydb.cursor() # get the database cursor
    query = "CREATE TABLE IF NOT EXISTS s19 "\
        + "(PLAYER_ID INT(10) NOT NULL, "\
        + "PLAYER_NAME VARCHAR(50) NOT NULL, "\
        + "TEAM_ABBREV VARCHAR(5) NOT NULL, "\
        + "AST INT(10) NOT NULL, "\
        + "BLK INT(10) NOT NULL, "\
        + "DREB INT(10) NOT NULL, "\
        + "FG3A INT(10) NOT NULL, "\
        + "FG3M INT(10) NOT NULL, "\
        + "FG3_PCT DOUBLE(15, 3) NOT NULL, "\
        + "FGA INT(10) NOT NULL, "\
        + "FGM INT(10) NOT NULL, "\
        + "FG_PCT DOUBLE(15, 3) NOT NULL, "\
        + "FTA INT(10) NOT NULL, "\
        + "FTM INT(10) NOT NULL, "\
        + "FT_PCT DOUBLE(15, 3) NOT NULL, "\
        + "GP INT(10) NOT NULL, "\
        + "GS INT(10) NOT NULL, "\
        + "MIN DOUBLE(15, 3) NOT NULL, "\
        + "OREB INT(10) NOT NULL, "\
        + "PF INT(10) NOT NULL, "\
        + "PLAYER_AGE INT(10) NOT NULL, "\
        + "PTS INT(10) NOT NULL, "\
        + "REB INT(10) NOT NULL, "\
        + "STL INT(10) NOT NULL, "\
        + "TOV INT(10) NOT NULL, "\
        + "PRIMARY KEY(PLAYER_ID, TEAM_ABBREV))";
    cursor.execute(query);

def _load_players(mydb):

    # Get all players.
    cursor = mydb.cursor() # get the database cursor   

    #player_info = playercareerstats.PlayerCareerStats(player_id=2544, timeout=30)
    #regularSeasonStats = json.loads(player_info.get_normalized_json())['SeasonTotalsRegularSeason']
    #f.write(json.dumps(regularSeasonStats, indent=4, sort_keys=True))


    allPlayers = players.get_active_players()
    count = 0
    for player in allPlayers:
        print(player['id']);
        time.sleep(2)
        player_info = playercareerstats.PlayerCareerStats(player_id=player['id'], timeout=30)
        regularSeasonStats = json.loads(player_info.get_normalized_json())['SeasonTotalsRegularSeason']
        for season in regularSeasonStats:
            if season['SEASON_ID'] == "2019-20":
                query = "INSERT INTO s19 (PLAYER_ID, "\
                    + "PLAYER_NAME, "\
                    + "TEAM_ABBREV, "\
                    + "AST, "\
                    + "BLK, "\
                    + "DREB, "\
                    + "FG3A, "\
                    + "FG3M, "\
                    + "FG3_PCT, "\
                    + "FGA, "\
                    + "FGM, "\
                    + "FG_PCT, "\
                    + "FTA, "\
                    + "FTM, "\
                    + "FT_PCT, "\
                    + "GP, "\
                    + "GS, "\
                    + "MIN, "\
                    + "OREB, "\
                    + "PF, "\
                    + "PLAYER_AGE, "\
                    + "PTS, "\
                    + "REB, "\
                    + "STL, "\
                    + "TOV) VALUES (%s, %s, %s, %s, %s, "\
                    + "%s, %s, %s, %s, %s, "\
                    + "%s, %s, %s, %s, %s, "\
                    + "%s, %s, %s, %s, %s, "\
                    + "%s, %s, %s, %s, %s)";
                cursor.execute(query, 
                    (player['id'], player['full_name'], 
                    season['TEAM_ABBREVIATION'], season['AST'], season['BLK'],
                    season['DREB'], season['FG3A'], season['FG3M'], season['FG3_PCT'],
                    season['FGA'], season['FGM'], season['FG_PCT'], season['FTA'], 
                    season['FTM'], season['FT_PCT'], season['GP'], season['GS'],
                    season['MIN'], season['OREB'], season['PF'], season['PLAYER_AGE'],
                    season['PTS'], season['REB'], season['STL'], season['TOV']))

def _main():
    mydb = _get_db()
    _create_table(mydb)
    #allPlayers = players.get_active_players()
    #f = open("./test_output.txt", "a")
    #f.write(json.dumps(allPlayers))
    _load_players(mydb)

_main()
