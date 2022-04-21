import React from "react";
import PropTypes from 'prop-types';
import {Col, Row, Button}from 'react-bootstrap';

import './director-view.scss';



export class DirectorView extends React.Component{
  

  render() {
    const{ director, onBackClick} = this.props;

    return (
      <><Row>
          <Col med={4} className="director-view bg-light text-black" style={{marginTop: 150}}>
          <div className="director-name" />
          <span className="label">Director: </span>
          <span className="value">{director.Name}</span>
          </Col>
        </Row>
        <Row>
          <Col med={4} className="director-view bg-light text-black">
          <div className="director-name" />
          <span className="label">About: </span>
          <span className="value">{director.About}</span>
          </Col>
        </Row>
        <Row>
          <Col med={4} className="director-view bg-light text-black">
          <div className="director-name" />
          <span className="label">Born: </span>
          <span className="value">{director.Born}</span>
          </Col>
        </Row>
        <Row>
          <Col med={4} className="director-view bg-light text-black">
          <div className="director-name" />
          <span className="label">Death: </span>
          <span className="value">{director.Death}</span>
          </Col>
        </Row>
        <Row>
          <Col>
          
            <Button  onClick={() => { onBackClick(null); } } variant="danger" style={{marginTop: 50, }}>Back</Button>
            
          </Col>
        </Row></>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};