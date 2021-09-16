import React from 'react';
import { Card } from "@rmwc/card";
import PropTypes from 'prop-types';

import './Modal.scss';


export default class Modal extends React.Component {
  static propTypes = {
    backgroundClickCallback: PropTypes.func.isRequired,
  }
  render(){
    const {className, children, open, backgroundClickCallback, onAnimationEnd,
      ...props} = this.props;

    const newClassName = [className, "modal-content"];
    return(
      <div
        style={{display: open ? "inherit" : "none"}}
        className={(open ? 'modal-container-show': 'model-container-hidden')  + ' modal-container'}
      >
        <div 
          onAnimationEnd={onAnimationEnd}
          className="modal-background"
          onClick={e => backgroundClickCallback(e)}
        />
        <Card 
          className={newClassName}
          {...props}
        >
          {children}
        </Card>
      </div>
    );
  }

}
