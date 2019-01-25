// jshint ignore:start
import React, { Component } from "react";
import '../styles/Profile.css';

export default class Profile extends Component {
  render() {
    return (
      <div className='profile'>
      	<p className='summoner'>{this.props.summonerName}</p>
        <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.profileIcon}  alt="" />
      </div>
    );
  }
}