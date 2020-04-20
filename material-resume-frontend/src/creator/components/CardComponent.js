import React from 'react';

import './CardComponent.scss';

import Card, {
    CardPrimaryContent,
    CardMedia,
    CardActions,
    CardActionButtons,
    CardActionIcons
} from "@material/react-card";

import {
  Body1,
  Body2,
  Headline6,
} from '@material/react-typography';

import MaterialIcon from '@material/react-material-icon';


export default class CardComponent extends React.Component {
  constructor(props){
    super(props)
    console.log(props.key);
  }

  render(){
    return (
      <Card 
        className='card-component'
      >
        <Headline6>Title</Headline6>
        <div className='card-location-date'>
          <Body2>Location</Body2>
          <div className='card-date-text'>
            <Body2>Date</Body2>
          </div>
        </div>
        <Body1>Job Description goes here lalalalallala</Body1>
      </Card>
    )
  }
}
