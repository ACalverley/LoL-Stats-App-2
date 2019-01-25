// jshint ignore:start
import React, { Component } from "react";
import Match from './Match';
// import '../styles/MatchList.css';

export default class MatchList extends Component {
  createMatchList = () => {
    let matches;

    if(this.props.loggedIn && this.props.matchesData){
      console.log(this.props.matchesData);
      matches = this.props.matchesData.map((match, key) =>
        <Match matchData={match} key={key} />
      );
    } else {
      matches = <div></div>
    }

    return matches
  }

  render() {
    return (
      <div>
        {this.createMatchList()}
      </div>
    );
  }
}