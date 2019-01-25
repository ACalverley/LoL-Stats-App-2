// jshint ignore:start
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Profile from './Profile';
import Champion from './Champion';
import Stats from './Stats';
import '../styles/Match.css';

export default class Match extends Component {
  render() {
    return (
      <Grid className='match'>
        <Row className='topRow'>
          <Col xs={2}>
            <Profile summonerName={this.props.matchData.summonerName}
                      profileIcon={this.props.matchData.profileIconPath}/>
          </Col>
          <Col xs={6}>
            <Col xs={2}>
              <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.matchData.spells[0]}  alt="" />
              <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.matchData.spells[1]}  alt="" />
            </Col>
            <Col xs={2}>
              <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.matchData.runes[0]}  alt="" />
              <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.matchData.runes[1]}  alt="" />
            </Col>
            <Col xs={8}>
              <Champion champIcon={this.props.matchData.champ}
                        champName={this.props.matchData.champName}
                        champLvl={this.props.matchData.champLvl}/>
            </Col>
          </Col>
          <Col xs={4}>
            <Col xs={4}>
              <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.matchData.items[0]}  alt="" />
              <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.matchData.items[1]}  alt="" />
            </Col>
            <Col xs={4}>
              <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.matchData.items[2]}  alt="" />
              <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.matchData.items[3]}  alt="" />
            </Col>
            <Col xs={4}>
              <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.matchData.items[4]}  alt="" />
              <img src={process.env.PUBLIC_URL + 'client/public/resources/img/' + this.props.matchData.items[5]}  alt="" />
            </Col>
          </Col>
        </Row>
        <Row className='bottomRow'>
          <Col xs={2}>
            <p className='statsHeader'>Game Stats:</p>
          </Col>
          <Col xs={10}>
            <Stats win={this.props.matchData.win}
                  KDA={this.props.matchData.KDA}
                  csScore={this.props.matchData.totalCS}
                  csMin={this.props.matchData.csMin}
                  kills={this.props.matchData.kills}
                  assists={this.props.matchData.assists}
                  deaths={this.props.matchData.deaths}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}