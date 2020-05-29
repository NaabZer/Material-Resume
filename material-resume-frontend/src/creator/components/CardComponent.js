import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './CardComponent.scss';

import { Card } from "@rmwc/card";
import { Select } from '@rmwc/select';
import { Typography } from '@rmwc/typography';


class CardComponent extends React.Component {
  static defaultSettings = {
    dataSource: 'initial'
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    componentid: PropTypes.number
  }

  static isGrid = false;

  static Name = "Work Card";
  
  render(){
    const {data} = this.props;
    return (
      <Card 
        className='card-component'
      >
        <Typography use='headline6'>{data.en.title}</Typography>
        <div className='card-location-date'>
          <Typography use='body2'>{data.en.location}</Typography>
          <div className='card-date-text'>
            <Typography use='body2'>{data.en.dateStart + "-"}</Typography>
            <Typography use='body2'>{data.en.dateEnd}</Typography>
          </div>
        </div>
        <Typography use='body1'>
          {data.en.description}
        </Typography>
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

export default connect(mapStateToProps, null, null, {forwardRef: true})(CardComponent);

export class CardComponentSettingsForm extends React.Component {
  constructor(props){
    super(props);

    this.state = this.props.settings;
  }

  onChange = (type, e) =>{
    this.setState({[type]: e.currentTarget.value});
  }

  getSettings = () =>{
    return(this.state);
  }

  render(){
    console.log(this.props.entries.work)
    const options = Object.entries(this.props.entries.work).map(([key, entry]) => {
      return(
      <option key={key} value={entry.id}>
        {entry.en.title + " - " + entry.en.location}
      </option>
    )});


    return(
      <div
        style={{width: '100%'}}
      >
        <Select 
          style={{width: '100%'}}
          label='Data source'
          name='dataSource'
          value={this.state.dataSource}
          onChange={e => this.onChange('dataSource', e)}
        >
          {options}
        </Select>
      </div>
    );
  }
}
