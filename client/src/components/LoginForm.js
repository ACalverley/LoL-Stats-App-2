// jshint ignore:start
import React, { Component } from "react";
import { Button, Form, FormGroup, Row, Col, Grid, FormControl, ControlLabel, Dropdown, MenuItem } from "react-bootstrap";
import '../styles/LoginForm.css';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false
    };
  }

  validateForm() {
    if (this.state.disabled){
      return false
    } else {
      return this.props.summonerName.length > 0;
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ disabled: true });
    await this.props.handleLogin(this.props.summonerName, this.props.numMatches);
    this.setState({ disabled: false });
  }

  updateDropdown = (numMatches) => {
    this.setState({ numMatches: numMatches });
  }

  render() {
    return (
      <div className="LoginForm">
        <Form onSubmit={this.handleSubmit}>
          <Grid>
            <FormGroup id='loginInfo' bsSize='large'>
              <Row>
                <Col xs={8}>
                  <ControlLabel>Summoner Name</ControlLabel>
                </Col>
                <Col xs={4}>
                  <ControlLabel>Number of Matches</ControlLabel>
                </Col>
              </Row>
              <Row>
                <Col xs={8}>
                  <FormControl
                    autoFocus
                    placeholder="Summoner Name"
                    type="text"
                    value={this.props.summonerName}
                    onChange={e => this.props.onSummonerNameChange(e.target.value)}/>
                </Col>
                <Col xs={4}>
                  <Dropdown 
                    className='dropdown'
                    id='dropdown-custom'
                    bsStyle={'default'}
                    bsSize='large'
                    onSelect={(eventKey) => this.props.onNumMatchesChange(eventKey)}>
                    <Dropdown.Toggle>{this.props.numMatches}</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <MenuItem eventKey="1">1</MenuItem>
                      <MenuItem eventKey="2">2</MenuItem>
                      <MenuItem eventKey="3">3</MenuItem>
                      <MenuItem eventKey="4">4</MenuItem>
                      <MenuItem eventKey="5">5</MenuItem>
                      <MenuItem eventKey="6">6</MenuItem>
                      <MenuItem eventKey="7">7</MenuItem>
                      <MenuItem eventKey="8">8</MenuItem>
                      <MenuItem eventKey="9">9</MenuItem>
                      <MenuItem eventKey="10">10</MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row>
                <Button
                  className='submit'
                  block
                  bsSize="large"
                  disabled={!this.validateForm()}
                  type="submit"
                >
                  {this.state.disabled ? 'Getting Info...' : 'Get your Stats!'}
                </Button>
              </Row>
            </FormGroup>
          </Grid>
        </Form>
      </div>
    );
  }
}


