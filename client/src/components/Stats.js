// jshint ignore:start
import React, { Component } from "react";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import '../styles/Stats.css';

export default class Stats extends Component {
  render() {
    return (
      <div className='stats'>
      	<div className='col'>
      		<p>{this.props.gameDuration} minutes</p>
      		<p>KDA: {this.props.KDA}</p>
      	</div>
    		<div className='col'>
    			<p>Kills: {this.props.kills}</p>
    			<p>Assists: {this.props.assists}</p>
    		</div>
    		<div className='col'>
    			<p>Deaths: {this.props.deaths}</p>
    			<p>CS Score: {this.props.csScore} ({this.props.csMin}/min)</p>
    		</div>
      </div>
    );
  }
}