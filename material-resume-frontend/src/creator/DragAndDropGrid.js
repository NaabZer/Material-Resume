import React from 'react';
import PropTypes from 'prop-types';

export default class DragAndDropGrid extends React.Component {
  constructor(props){
    super(props)

    this.mouseOver = false;
    this.children = []
  }

  static displayName = 'DragAndDropGrid';

  static propTypes = {
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired
  }

  getHoveredComponent = () => {
    var childComp = null;
    this.children.some(child => {
      const childComponent = child.getHoveredComponent();
      if(childComponent !== null){
        childComp =  childComponent;
        return true;
      }
      return false;
    })

    if(childComp !== null){
      return childComp
    } else if(this.mouseOver){
      return this;
    } else{
      return null;
    }
  }

  onMouseEnter = e =>{
    console.log("entered " + this.props.name);
    this.mouseOver = true;
  }
  onMouseLeave = e =>{
    console.log("exited " + this.props.name);
    this.mouseOver = false;
  }

  render(){
    return (
      <div {...this.props}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.props.children}
      </div>
    )
  }
}
