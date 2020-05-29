import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './CardComponent.scss';

import Card from "@material/react-card";
import Select, { Option } from '@material/react-select';
import {
  Body1,
  Body2,
  Headline6,
} from '@material/react-typography';


class CardComponent extends React.Component {
  static defaultSettings = {
    dataSource: '2'
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

export default connect(mapStateToProps, null, null, {forwardRef: true})(CardComponent);

export class CardComponentSettingsForm extends React.Component {
  constructor(props){
    super(props);

    this.state = this.props.settings;
  }

  onChange = e =>{
    console.log(e.target.value);
    this.setState({[e.target.name]: e.target.value});
  }

  getSettings = () =>{
    return(this.state);
  }

  render(){
    console.log(this.props.entries.work)
    const options = Object.entries(this.props.entries.work).map(([key, entry]) => {
      console.log(entry.id);
      return(
      <Option key={key} value={entry.id}>
        {entry.en.title + " - " + entry.en.location}
      </Option>
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
          onChange={this.onChange}
        >
          {options}
        </Select>
      </div>
    );
  }
}
