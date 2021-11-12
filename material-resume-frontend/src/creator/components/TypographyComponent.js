import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './TypographyComponent.scss';

import { Select } from '@rmwc/select';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { IconButton } from '@rmwc/icon-button';

import { TEXT_TYPOGRAPHY_OPTIONS } from '../../utility/Typography';

class TypographyComponent extends React.Component {
  static defaultSettings = {
    componentid: 'sample',
    typography: 'headline6',
    color: '#000000',
    horizontalAlign: 'center',
    verticalAlign: 'center',
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    componentid: PropTypes.number
  }

  static isGrid = false;

  static Name = "Typography text";
  
  render(){
    const {data, lang} = this.props;
    const classNames = 'typography-component mdc-elevation-transition mdc-elevation--z0';
    let justify = 'flex-start';
    let textAlign = 'left';
    if(this.props.settings.horizontalAlign === 'center'){
      justify = 'center';
      textAlign = 'center';
    } else if(this.props.settings.horizontalAlign === 'right'){
      justify = 'flex-end';
      textAlign = 'right';
    }
    let align = 'flex-start';
    if(this.props.settings.verticalAlign === 'center'){
      align = 'center';
    } else if(this.props.settings.verticalAlign === 'bottom'){
      align = 'flex-end';
    }
    return (
      <div
        className={classNames}
        style={{justifyContent: justify, alignItems: align, textAlign: textAlign}}
      >
        <Typography
          use={this.props.settings.typography}
          style={{color: this.props.settings.color}}
        >
          {data.entries[lang].text}
        </Typography>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  let ret = {};
  const componentid = props.settings.componentid;
  if(componentid === 'sample'){
    ret = {
      ...ret,
      data: state.entries.text[componentid]
    };
  } else{
    ret = {
      ...ret,
      data: state.entries.text.entries[componentid]
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

export default connect(mapStateToProps, null, null, {forwardRef: true})(TypographyComponent);

export class TypographyComponentSettingsForm extends React.Component {
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

  setAlign = (type, pos) => {
    this.setState({[type]: pos})
  }

  render(){
    const texts = Object.entries(this.props.entries.text.entries).map(([key, entry]) => {
      return(
      <option key={key} value={entry.id}>
        {entry.entries.en.text}
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
          {texts}
        </Select>
        <TextField
          style={{width: '100%'}}
          label='Color'
          name='color'
          type='color'
          value={this.state.color}
          onChange={e => this.onChange('color', e)}
        />
        <div
          style={{paddingTop: '16px'}}
        />
        <Select
          style={{width: '100%'}}
          label='Typography'
          name='typography'
          options={TEXT_TYPOGRAPHY_OPTIONS}
          value={this.state.typography}
          onChange={e => this.onChange('typography', e)}
        />
        <Typography use='subtitle1'>Horizontal Align</Typography>
        <div
          style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
        >
          <IconButton
            icon='format_align_left'
            className={this.state.horizontalAlign === 'left' ?
                'mdc-elevation--z4 icon-button-on' : 'icon-button-off'}
            onClick={() => this.setAlign('horizontalAlign', 'left')}
          />
          <IconButton
            icon='format_align_center'
            className={this.state.horizontalAlign === 'center' ?
                'mdc-elevation--z4 icon-button-on' : 'icon-button-off'}
            onClick={() => this.setAlign('horizontalAlign', 'center')}
          />
          <IconButton
            icon='format_align_right'
            className={this.state.horizontalAlign === 'right' ?
                'mdc-elevation--z4 icon-button-on' : 'icon-button-off'}
            onClick={() => this.setAlign('horizontalAlign', 'right')}
          />
        </div>
        <Typography use='subtitle1'>Vertical Align</Typography>
        <div
          style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
        >
          <IconButton
            icon='vertical_align_top'
            className={this.state.verticalAlign === 'top' ?
                'mdc-elevation--z4 icon-button-on' : 'icon-button-off'}
            onClick={() => this.setAlign('verticalAlign', 'top')}
          />
          <IconButton
            icon='vertical_align_center'
            className={this.state.verticalAlign === 'center' ?
                'mdc-elevation--z4 icon-button-on' : 'icon-button-off'}
            onClick={() => this.setAlign('verticalAlign', 'center')}
          />
          <IconButton
            icon='vertical_align_bottom'
            className={this.state.verticalAlign === 'bottom' ?
                'mdc-elevation--z4 icon-button-on' : 'icon-button-off'}
            onClick={() => this.setAlign('verticalAlign', 'bottom')}
          />
        </div>
      </div>
    );
  }
}
