// jshint ignore:start
import React, { Component } from 'react';
import { PageHeader } from "react-bootstrap";
import LoginForm from './LoginForm';
import MatchList from './MatchList';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      notFoundError: '',
      summonerName: '',
      numMatches: 5
    };
  }

  onSummonerNameChange = (summonerName) => {
    this.setState({ summonerName });
  }

  onNumMatchesChange = (numMatches) => {
    this.setState({ numMatches });
  }

  onLogin = async (summonerName, numMatches) => {
    this.setState({ summonerName: summonerName });
    this.setState({ numMatches: numMatches })

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({summonerName: summonerName,
                              numMatches: numMatches}),
      });

      // console.log("got response from server");

      const body = await response.json();
      this.setState({ matches: body.data.matches });
      this.setState({ notFoundError: '' });
      this.setState({ isLoggedIn: true });
    
    } catch (e) {
      console.log(e);
      this.setState({ notFoundError: "The summoner name could not be found!"});
    }
    
    this.setState({ summonerName: '' });
  }

  render() {
    let recentMatches;
    if (!this.state.isLoggedIn){
      recentMatches = <h3>Enter your Summoner Name to see your stats!</h3>
    } else {
      recentMatches = <MatchList matchesData={this.state.matches}
                                loggedIn={this.state.isLoggedIn} />
    }

    return (
      <div className="App">
        <PageHeader>Welcome to LoL Stats App</PageHeader>
        <p>{this.state.notFoundError}</p>
        <LoginForm handleLogin={this.onLogin}
                  summonerName={this.state.summonerName}
                  numMatches={this.state.numMatches}
                  onSummonerNameChange={this.onSummonerNameChange}
                  onNumMatchesChange={this.onNumMatchesChange}/>
        {recentMatches}
      </div>
    );
  }
}
export default App;

