import React from 'react';
import PropTypes from 'prop-types';

import './ImageComponent.scss';

import { Icon } from "@rmwc/icon";
import { TextField } from '@rmwc/textfield';


class ImageComponent extends React.Component {
  static defaultSettings = {
    imageurl: '',
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    componentid: PropTypes.number
  }

  static isGrid = false;

  static Name = "Image";
  
  render(){
    let noImage = this.props.settings.imageurl === '';
    let image
    if(noImage){
      image = 
      <div className='stock-image'>
        <div className='stock-svg'/>
      </div>
    } else {
      image = <img src={this.props.settings.imageurl} alt=''/>
    }

    return (
      <div 
        className = 'image-component mdc-elevation--z4'
      >
        {image}
      </div>
    )
  }
}
export default ImageComponent;

export class ImageComponentSettingsForm extends React.Component {
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
    return(
      <div
        style={{width: '100%'}}
      >
        <TextField
          style={{width: '100%'}}
          label='Image Url'
          name='imageurl'
          type='url'
          value={this.state.imageurl}
          onChange={e => this.onChange('imageurl', e)}
        />
      </div>
    );
  }
}
