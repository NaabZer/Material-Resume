import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './CardComponent.scss';

import { Card } from "@rmwc/card";
import { Select } from '@rmwc/select';
import { Typography } from '@rmwc/typography';

import { DATE_TYPES, DATE_LONG_MONTH, formatDate } from '../../utility/DateFormats';


class CardComponent extends React.Component {
  static defaultSettings = {
    componentid: 'sample',
    dateFormat: DATE_LONG_MONTH
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    componentid: PropTypes.number
  }

  static isGrid = false;

  static Name = "Work Card";
  
  render(){
    const {data, lang} = this.props;
    const classNames = 'card-component mdc-elevation-transition mdc-elevation--z' + this.props.elevation;
    return (
      <Card 
        className={classNames}
      >
        <Typography 
          use='headline6'
          theme="textPrimaryOnBackground"
        >
          {data.entries[lang].title}
        </Typography>
        <div className='card-location-date'>
          <Typography 
            use='subtitle2'
            theme="textSecondaryOnBackground"
          >
            {data.entries[lang].location}
          </Typography>
          <div className='card-date-text'>
            <Typography 
              use='subtitle2'
              theme="textPrimaryOnBackground"
            >
              {formatDate(data.start, this.props.settings.dateFormat)}
            </Typography>
            <Typography 
              use='subtitle2'
              theme="textPrimaryOnBackground"
            >
              <div className='card-date-divider'>
                - 
              </div>
            </Typography>
            <Typography 
              use='subtitle2'
              theme="textPrimaryOnBackground"
            >
              {formatDate(data.end, this.props.settings.dateFormat)}
            </Typography>
            <div className='card-date-divider'>
            </div>
          </div>
        </div>
        <Typography 
          use='body1'
          theme="textPrimaryOnBackground"
        >
          {data.entries[lang].description}
        </Typography>
      </Card>
    )
  }
}

const mapStateToProps = (state, props) => {
  let ret = {};
  const componentid = props.settings.componentid;
  if(componentid === 'sample'){
    ret = { 
      ...ret,
      data: state.entries.experience[componentid]
    };
  } else{
    ret = {
      ...ret,
      data: state.entries.experience.entries[componentid]
    };
  }
  if(state.user.user){
    ret = {
      ...ret,
      lang: state.user.user.languages[state.components.langId].language
    }
  } else {
    ret = {
      ...ret,
      lang: 'en'
    }
  }

  return ret;
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
    const experiences = Object.entries(this.props.entries.experience.entries).map(([key, entry]) => {
      return(
      <option key={key} value={entry.id}>
        {entry.entries.en.title + " - " + entry.entries.en.location}
      </option>
    )});

    const dateFormats = DATE_TYPES.map(type => {
      return(
        <option key={type} value={type}>
          {formatDate(new Date(), type)}
        </option>
      )
    });


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
          {experiences}
        </Select>
        <div
          style={{paddingTop: '16px'}}
        />
        <Select 
          style={{width: '100%'}}
          label='Date Format'
          name='dateFormat'
          value={this.state.dateFormat}
          onChange={e => this.onChange('dateFormat', e)}
        >
          {dateFormats}
        </Select>
      </div>
    );
  }
}
