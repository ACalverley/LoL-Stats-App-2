// jshint ignore:start
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import '../styles/SingleGameStats.css';

export default class SingleGameStats extends Component {
  render() {
    return (
      <Table condensed id="Table">
        <tbody>
          <tr>
            <td><img className="profile" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.profileIconPath}  alt=""/></td>
            <td rowSpan="4"><img className="champ" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.champIconPath}  alt=""/></td>
            <td><img className="spell" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.spellIconPath1}  alt=""/></td>
            <td><img className="rune" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.runeIconPath1}  alt=""/></td>
            <td><img className="item" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.itemIconPath1}  alt=""/></td>
            <td><img className="item" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.itemIconPath2}  alt=""/></td>
            <td><img className="item" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.itemIconPath3}  alt=""/></td>
            <td></td>
            <td>Teammate 1</td>
            <td>Enemy 1</td>
          </tr>
          <tr>
            <td rowSpan="3">Victory/Defeat</td>
            <td><img className="spell" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.spellIconPath2}  alt=""/></td>
            <td><img className="rune" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.runeIconPath2}  alt=""/></td>
            <td><img className="item" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.itemIconPath4}  alt=""/></td>
            <td><img className="item" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.itemIconPath5}  alt=""/></td>
            <td><img className="item" src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.itemIconPath6}  alt=""/></td>
            <td></td>
            <td>Teammate 2</td>
            <td>Enemy 2</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Teammate 3</td>
            <td>Enemy 3</td>
          </tr>
          <tr>
            <td>Kills</td>
            <td>#</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Teammate 4</td>
            <td>Enemy 4</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{this.props.champName}</td>
            <td>Assists</td>
            <td>#</td>
            <td>Creep Score</td>
            <td>#</td>
            <td></td>
            <td></td>
            <td>Teammate 5</td>
            <td>Enemy 5</td>
          </tr>
          <tr>
            <td>KDA</td>
            <td>Level: {this.props.champLvl}</td>
            <td>Deaths</td>
            <td>#</td>
            <td>CS/min</td>
            <td>#</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    );
  }
}