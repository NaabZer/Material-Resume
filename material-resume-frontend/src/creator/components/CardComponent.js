import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './CardComponent.scss';

import { Card } from "@rmwc/card";
import { Select } from '@rmwc/select';
import { Typography } from '@rmwc/typography';


class CardComponent extends React.Component {
  static defaultSettings = {
    componentid: 'sample'
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
        <Typography use='headline6'>{data.entries.en.title}</Typography>
        <div className='card-location-date'>
          <Typography use='body2'>{data.entries.en.location}</Typography>
          <div className='card-date-text'>
            <Typography use='body2'>{data.start + "-"}</Typography>
            <Typography use='body2'>{data.end}</Typography>
          </div>
        </div>
        <Typography use='body1'>
          {data.entries.en.description}
        </Typography>
      </Card>
    )
  }
}

const mapStateToProps = (state, props) => {
  const componentid = props.settings.componentid;
  if(componentid === 'sample'){
    return({ 
      data: state.entries.experience[componentid]
    });
  } else{
    return({ 
      data: state.entries.experience.entries[componentid]
    });
  }
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
    const options = Object.entries(this.props.entries.experience.entries).map(([key, entry]) => {
      return(
      <option key={key} value={entry.id}>
        {entry.entries.en.title + " - " + entry.entries.en.location}
      </option>
    )});


    return(
      <div
        style={{width: '100%'}}
      >
        <Select 
          style={{width: '100%'}}
          label='Data source'
          name='componentid'
          value={this.state.componentid}
          onChange={e => this.onChange('componentid', e)}
        >
          {options}
        </Select>
      </div>
    );
  }
}
