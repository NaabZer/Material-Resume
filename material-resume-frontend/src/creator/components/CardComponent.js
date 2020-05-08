import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './CardComponent.scss';

import Card from "@material/react-card";

import {
  Body1,
  Body2,
  Headline6,
} from '@material/react-typography';


class CardComponent extends React.Component {
  static defaultSettings = {
    dataSource: 'initial'
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
  }

  static displayName = "Work Card";
  
  render(){
    const {data, settings} = this.props;
    return (
      <Card 
        className='card-component'
      >
        <Headline6>{data.en.title}</Headline6>
        <div className='card-location-date'>
          <Body2>{data.en.location}</Body2>
          <div className='card-date-text'>
            <Body2>{data.en.dateStart + "-"}</Body2>
            <Body2>{data.en.dateEnd}</Body2>
          </div>
        </div>
        <Body1>Job Description goes here lalalalallala</Body1>
      </Card>
    )
  }
}

const mapStateToProps = (state, props) => {
  const dataSource = props.settings.dataSource;
  return({ 
    data: state.entries.work[dataSource]
  });
}

export default connect(mapStateToProps, null)(CardComponent);
