import React from 'react';

import Modal from '../../Modal';
import SliderInput from '../../utility/SliderInput';

import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';


class PageModal extends React.Component {
  constructor(props){
    super(props)

    console.log(props.settings)
    this.state = props.settings
  }

  onChange = (type, e) =>{
    this.setState({[type]: e.currentTarget.value});
  }

  save = () => {

  }

  render(){
    return(
      <Modal
        open={this.props.open}
        backgroundClickCallback={this.props.cancelClickCallback}
      >
        <Typography
          use="headline4"
          style={{margin: '8px 0px'}}
        >
          Page {this.props.pagenum} 
        </Typography>
        <Typography
          style={{
            marginTop: '-8px',
            color: 'var(--mdc-theme-text-secondary-on-background)'
          }}
          use='body2'
        >
          Settings
        </Typography>
        <SliderInput
          label='Grid Columns'
          value={this.state.cols}
          onChange={e => this.onChange('cols', e)}
          min={1}
          max={10}
          discrete
          step={1}
        />
        <SliderInput
          label='Grid Rows'
          value={this.state.rows}
          onChange={e => this.onChange('rows', e)}
          min={1}
          max={12}
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
        <div
          style={{marginTop: '8px', display: 'flex', justifyContent:'space-between'}}
        >
          <Button
            raised
            danger
            onClick={this.props.cancelClickCallback}
          >
            Cancel
          </Button>
          <Button
            raised
            onClick={this.props.confirmClickCallback}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    );
  }
}


export default PageModal;
