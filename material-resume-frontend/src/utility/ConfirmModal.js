import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';


export default class ConfirmModal extends React.Component {
  static propTypes = {
    backgroundClickCallback: PropTypes.func.isRequired,
  }
  render(){
    let {confirm, second, cancel} = this.props;
    if(!confirm){
      confirm = 'Confirm'
    }

    if(!cancel){
      cancel = 'Cancel'
    }

    return(
      <Modal
        open={this.props.open}
        style={{justifyContent: 'space-between'}}
        backgroundClickCallback={this.props.cancelClickCallback}
      >
        <div
          style={{display: 'flex', flexDirection: 'column'}}
        >
          <Typography
            use="headline4"
            style={{margin: '8px 0px'}}
          >
            {this.props.text}
          </Typography>
          <Typography
            style={{
              marginTop: '-8px',
              color: 'var(--mdc-theme-text-secondary-on-background)'
            }}
            use='body2'
          >
            {this.props.subtitle}
          </Typography>
        </div>
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
          <div
            style={{display: 'flex'}}
          >
            {second &&
              <Button
                raised
                style={{marginRight: '8px'}}
                onClick={this.props.secondClickCallback}
              >
                {second}
              </Button>
            }
            <Button
              raised
              onClick={this.props.confirmClickCallback}
            >
              {confirm}
            </Button>
          </div>

        </div>
      </Modal>
    )
  }
}
