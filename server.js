// jshint ignore:start
require('dotenv').config();
const express = require('express');
      path = require('path');
      bodyParser = require('body-parser');
      cors = require('cors');
      LeagueJS = require('leaguejs');
      toDate = require('normalize-date');
      dateDifference = require('datetime-difference')
      fs = require('fs');

      
const app = express();
const port = process.env.PORT || 5000;
const leagueJs = new LeagueJS(process.env.LOL_API_KEY, {
  useV4: true, // enables apiVersion overrides
  apiVersionOverrides: {
      'Match': 'v4',
      'Summoner': 'v4'
      }
    });

app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))
   .use(express.static(__dirname, { dotfiles: 'allow' } ))
   .use(cors());

// loading static data for getting img paths
const profileIconData = JSON.parse(fs.readFileSync('./public/DDragon/data/en_US/profileicon.json', 'utf-8'));
const championData = (JSON.parse(fs.readFileSync('./public/DDragon/data/en_US/championFull.json', 'utf-8'))).keys;
const itemData = (JSON.parse(fs.readFileSync('./public/DDragon/data/en_US/item.json', 'utf-8'))).data;
const runesReforged = JSON.parse(fs.readFileSync('./public/DDragon/data/en_US/runesReforged.json', 'utf-8'));
const spellData = (JSON.parse(fs.readFileSync('./public/DDragon/data/en_US/summoner.json', 'utf-8'))).data;

// condensing static data for quicker lookups of img paths
let condensedRuneData = {};
runesReforged.forEach((obj) => {
  const pathID = obj.id;
  const iconPath = obj.icon;
  condensedRuneData[pathID] = iconPath;
});

// console.log(condensedRuneData);

let condensedSpellData = {};
for (const [key, value] of Object.entries(spellData)) {
  let spellID = value.key;
  let iconPath = value.image.group + '/' + value.image.full;
  condensedSpellData[spellID] = iconPath;
}

// console.log(condensedSpellData);

app.post('/login', async (req, res) => {
  let allMatchData = {
    matches: []
  };

  const summonerName = req.body.summonerName;
  const numMatches = req.body.numMatches;
  // getting match data
  try {
    userData = await leagueJs.Summoner.gettingByName(summonerName);
    const accountID = userData.accountId;

    generalMatchData = await leagueJs.Match.gettingListByAccount(accountID, 'na', {'endIndex': numMatches});

    detailedMatchData = await Promise.all(generalMatchData.matches.map((match) => leagueJs.Match.gettingById(match.gameId)));

    detailedMatchData.forEach((match) => {
      let matchData = {
        summonerName: summonerName,
        participantID: '',
        profileIconPath: '',
        runes: '',
        gameDuration: '',
        assists: '',
        kills: '',
        deaths: '',
        KDA: '',
        champLvl: '',
        champName: '',
        champ: '',
        win: '',
        totalCS: '',
        csMin: '',
        items: [],
        runes: [],
        spells: []
      }
      
      let profileIconID, participantID;
      let gameDuration = Math.floor(match.gameDuration/60);

      matchData.gameDuration = gameDuration;

      // finding participant ID for the match
      for (let i = 0; i < match.participantIdentities.length; i++) {
        if(match.participantIdentities[i].player.accountId == accountID){
          participantID = match.participantIdentities[i].participantId - 1;
          matchData.participantID = participantID; //-1 is for indexing
          profileIconID = match.participantIdentities[i].player.profileIcon;
          break;
        }
      }

      const stats = match.participants[participantID].stats;
      matchData.assists = stats.assists;
      matchData.kills = stats.kills;
      matchData.deaths = stats.deaths;

      if (stats.deaths == 0){
        matchData.KDA = "PERFECT";
      } else {
        matchData.KDA = ((stats.kills + stats.assists)/stats.deaths).toFixed(2);
      }

      let totalCS = stats.totalMinionsKilled
      matchData.totalCS = totalCS;
      matchData.csMin = (totalCS/gameDuration).toFixed(1);
      matchData.win = stats.win;
      matchData.items.push("item/" + stats.item0 + ".png");
      matchData.items.push("item/" + stats.item1 + ".png");
      matchData.items.push("item/" + stats.item2 + ".png");
      matchData.items.push("item/" + stats.item3 + ".png");
      matchData.items.push("item/" + stats.item4 + ".png");
      matchData.items.push("item/" + stats.item5 + ".png"); //0 means no item
      matchData.champLvl = stats.champLevel;

      // getting static data paths
      const primaryPath = stats.perkPrimaryStyle, secondaryPath = stats.perkSubStyle;
      matchData.runes.push(condensedRuneData[primaryPath]);
      matchData.runes.push(condensedRuneData[secondaryPath]);

      const champID = match.participants[participantID].championId;
      const champName = championData[champID];
      matchData.champName = champName;
      matchData.champ = "champion/" + champName + ".png";

      matchData.profileIconPath = profileIconData.data[profileIconID].image.group + '/' + profileIconData.data[profileIconID].image.full;

      const spell1ID = match.participants[participantID].spell1Id, spell2ID = match.participants[participantID].spell2Id;
      matchData.spells.push(condensedSpellData[spell1ID]);
      matchData.spells.push(condensedSpellData[spell2ID]);

      allMatchData.matches.push(matchData);
    });

    // console.log("no error");
    // console.log(allMatchData);
    res.send({data: allMatchData});

  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));