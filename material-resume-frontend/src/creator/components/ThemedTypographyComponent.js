import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Select } from '@rmwc/select';
import { Typography } from '@rmwc/typography';
import { IconButton } from '@rmwc/icon-button';

import TypographyComponent from './TypographyComponent';

import { TEXT_TYPOGRAPHY_OPTIONS } from '../../utility/Typography';
import { TEXT_COLOR_OPTIONS, THEME_COLOR_PRIMARY } from '../../utility/Themes';

class ThemedTypographyComponent extends React.Component {
  static defaultSettings = {
    componentid: 'sample',
    typography: 'headline6',
    colorType: THEME_COLOR_PRIMARY,
    horizontalAlign: 'center',
    verticalAlign: 'center',
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    componentid: PropTypes.number
  }

  static isGrid = false;

  static Name = "Themed Typography text";
  
  render(){
    const {settings, forwardedRef} = this.props;
    settings.color = 'var(' + settings.colorType + ')'
    return (
      <TypographyComponent settings={settings} ref={forwardedRef} {...this.props}/>
    )
  }
}

const mapStateToProps = (state, props) => {
  const componentid = props.settings.componentid;
  if(componentid === 'sample'){
    return({ 
      data: state.entries.text[componentid]
    });
  } else{
    return({ 
      data: state.entries.text.entries[componentid]
    });
  }
}

export default connect(mapStateToProps, null, null, {forwardRef: true})(ThemedTypographyComponent);

export class ThemedTypographyComponentSettingsForm extends React.Component {
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
        <div
          style={{paddingTop: '16px'}}
        />
        <Select
          style={{width: '100%'}}
          label='Theme Color'
          name='colorType'
          options={TEXT_COLOR_OPTIONS}
          value={this.state.colorType}
          onChange={e => this.onChange('colorType', e)}
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
