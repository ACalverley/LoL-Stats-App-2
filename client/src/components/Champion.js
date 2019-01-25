// jshint ignore:start
import React, { Component } from "react";
import '../styles/Champion.css';

export default class Champion extends Component {
  render() {
    return (
      <div className='champion'>
        <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.champIcon}  alt="" />
        <p>{this.props.champName} - Level: {this.props.champLvl}</p>
      </div>      
    );
  }
}