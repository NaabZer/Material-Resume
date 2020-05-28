import React from 'react';
import Card from "@material/react-card";
import PropTypes from 'prop-types';

import './Modal.scss';


export default class Modal extends React.Component {
  static propTypes = {
    backgroundClickCallback: PropTypes.func.isRequired,
  }
  render(){
    const {className, children, open, backgroundClickCallback,
      ...props} = this.props;

    const newClassName = [className, "modal-content"];
    return(
      <div
        style={{display: open ? "inherit" : "none"}}
        className='modal-container'
      >
        <div 
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
