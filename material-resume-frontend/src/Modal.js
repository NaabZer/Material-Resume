import React from 'react';
import Card from "@material/react-card";
import './Modal.scss';

export default class Modal extends React.Component {
  render(){
    const {className, children, open, ...props} = this.props;

    const newClassName = [className, "modal-content"];
    return(
      <div
        style={{display: open ? "inherit" : "none"}}
        className='modal-container'
      >
        <div className="modal-background"/>
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
