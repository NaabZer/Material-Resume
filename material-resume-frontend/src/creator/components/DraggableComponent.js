import React from 'react';
import PropTypes from 'prop-types';
import {DraggableCore} from 'react-draggable';

export default class DragAndDropGrid extends React.Component {
  constructor(props){
    super(props)
    this.state = {x: 0, y: 0}
  }

  static propTypes = {
    onDrop: PropTypes.func.isRequired,
    onDrag: PropTypes.func.isRequired
  }

  resetPos = () =>{
    this.setState({x: 0, y: 0})
  }

  onDrop = (e, data) => {
    this.props.onDrop(this, e, data)
  }

  onDrag = (e, data) => {
    this.setState({x: this.state.x + data.deltaX, y: this.state.y + data.deltaY})
    this.props.onDrag(this, e, data);
  }

  render(){
    const {style, ...props} = this.props
    var new_style = {transform: "translate("+this.state.x+"px, "+this.state.y+"px)"}
    return (
      <DraggableCore
        onStop={this.onDrop}
        onDrag={this.onDrag}
      >
        <div
          style={new_style}
          {...props}
        >
          {props.children}
        </div>
      </DraggableCore>
    );
  }
}
