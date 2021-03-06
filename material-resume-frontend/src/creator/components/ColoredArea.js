import React from 'react';
import PropTypes from 'prop-types';

import { Elevation } from "@rmwc/elevation"; 
import { TextField } from '@rmwc/textfield';

import './CardComponent.scss';
import hoistNonReactStatic from 'hoist-non-react-statics';

import SliderInput from '../../utility/SliderInput';

import DragAndDropGrid from '../DragAndDropGrid';


class ColoredArea extends React.Component {
  static defaultSettings = {
    rows: 12,
    cols: 2,
    gap: '4px',
    background: '#6200ee'
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    componentid: PropTypes.number
  }

  static isGrid = true;

  static Name = "Colored Area"
  
  render(){
    const {settings, componentid, forwardedRef, ondropcallback, props,} = this.props;
    return (
      <Elevation z={this.props.elevation} wrap transition>
        <div
          style={{background: settings.background, width:"100%", height:"100%"}}
        >
          <DragAndDropGrid 
            {...props}
            ref={forwardedRef}
            componentdropcallback={ondropcallback}
            componentdragcallback={() => {}}
            isgrid={true}
            rows={settings.rows}
            columns={settings.cols}
            gap={settings.gap}
            componentid={componentid}
            style={{
              width: 'calc(100% - 2*'+settings.gap+")",
              height: 'calc(100% - 2*'+settings.gap+")",
            }}
          />
        </div>
      </Elevation>
    )
  }
}

const mapStateToProps = (state, props) => {
  return({ 
    data: state.entries
  });
}

const forwardedColoredArea = React.forwardRef((props, ref) =>{
  return <ColoredArea {...props} forwardedRef={ref}/>;
});
hoistNonReactStatic(forwardedColoredArea, ColoredArea);
export default forwardedColoredArea;

export class ColoredAreaSettingsForm extends React.Component {
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
          label='Color'
          name='background'
          type='color'
          value={this.state.background}
          onChange={e => this.onChange('background', e)}
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
