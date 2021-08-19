import React from 'react';
import PropTypes from 'prop-types';

import hoistNonReactStatic from 'hoist-non-react-statics';

import { Select } from '@rmwc/select';

import ColoredArea from './ColoredArea';
import SliderInput from '../../utility/SliderInput';

import {
  THEME_COLOR_PRIMARY,
  THEME_COLOR_SECONDARY,
  THEME_COLOR_ERROR,
  THEME_COLOR_BACKGROUND,
  THEME_COLOR_SURFACE,
} from '../../utility/Themes'


class ThemedColoredArea extends React.Component {
  static defaultSettings = {
    rows: 12,
    cols: 2,
    gap: '4px',
    colorType: THEME_COLOR_PRIMARY
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    componentid: PropTypes.number
  }

  static isGrid = true;

  static Name = "Themed Colored Area"
  
  render(){
    const {settings, forwardedRef} = this.props;
    settings.background = 'var(' + settings.colorType + ')'
    return (
      <ColoredArea settings={settings} ref={forwardedRef} {...this.props}/>
    )
  }
}

const forwardedThemedColoredArea = React.forwardRef((props, ref) =>{
  return <ThemedColoredArea {...props} forwardedRef={ref}/>;
});
hoistNonReactStatic(forwardedThemedColoredArea, ThemedColoredArea);
export default forwardedThemedColoredArea;

const ColorOptions = [
  {
    label: 'Primary',
    value: THEME_COLOR_PRIMARY
  },
  {
    label: 'Secondary',
    value: THEME_COLOR_SECONDARY
  },
  {
    label: 'Error',
    value: THEME_COLOR_ERROR
  },
  {
    label: 'Background',
    value: THEME_COLOR_BACKGROUND
  },
  {
    label: 'Surface',
    value: THEME_COLOR_SURFACE
  }
]

export class ThemedColoredAreaSettingsForm extends React.Component {
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
        <Select
          style={{width: '100%'}}
          label='Theme Color'
          name='colorType'
          options={ColorOptions}
          value={this.state.colorType}
          onChange={e => this.onChange('colorType', e)}
        />
        <SliderInput
          label='Rows'
          value={this.state.rows}
          onChange={e => this.onChange('rows', e)}
          min={1}
          max={20}
          discrete
          step={1}
        />
        <SliderInput
          label='Columns'
          value={this.state.cols}
          onChange={e => this.onChange('cols', e)}
          min={1}
          max={20}
          discrete
          step={1}
        />
        <SliderInput
          label='Grid Gap'
          value={this.state.gap}
          onChange={e => this.onChange('gap', e)}
          min={1}
          max={20}
          discrete
          step={1}
          suffix='px'
        />
      </div>
    );
  }
}
