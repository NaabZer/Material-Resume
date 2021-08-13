import React from 'react';
import { Slider } from '@rmwc/slider';
import { Typography } from '@rmwc/typography';

export default class SliderInput extends React.Component {
  onChange = e => {
    if(this.props.suffix) {
      e.currentTarget.value = e.currentTarget.value + this.props.suffix
    } 
    this.props.onChange(e)
  }
  render(){
    let {onChange, onInput, value, label, suffix, ...rest} = this.props;
    let newValue = value
    if(suffix){
      newValue = value.slice(0, -1 * suffix.length)
    }
    return(
      <div
        style={{width: '100%', display: 'flex', flexDirection: 'column', margin: '8px 0px'}}
      >
        <Typography use='subtitle1'>{label}</Typography>
        <div
          style={{width: '100%', display: 'flex', margin: '0px 8px', marginTop:'-12px'}}
        >
          <Slider
            style={{flexGrow: 4, marginRight: '8px'}}
            onChange={e => this.onChange(e)}
            onInput={e => this.onChange(e)}
            value={newValue}
            {...rest}
          />
          <input
            type='number'
            value={newValue}
            onChange={e => this.onChange(e)}
            style={{border: 'none', outline: 'none', flexBasis: '15%', width: '15%'}}
          />
        </div>
      </div>
    );
  }
}
