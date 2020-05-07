import React from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';
import { Resizable } from 'react-resizable';
import { connect } from 'react-redux';
import { startDrag, endDrag } from '../../actions/dragAndDrop';

class DraggableComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {x: 0, y: 0, w: 0, h: 0}
    this.ref = React.createRef();
  }

  static propTypes = {
    ondropcallback: PropTypes.func.isRequired,
    ondragcallback: PropTypes.func.isRequired,
    resizable: PropTypes.bool,
    componentid: PropTypes.number.isRequired,
  }

  resetPos = () =>{
    this.setState({x: 0, y: 0})
  }

  resetSize = () => {
    this.setState({w: 0, h: 0})
  }

  onDrop = (e, data) => {
    if('componentid' in this.props){
      data.id = this.props.componentid;
    }
    this.props.endDrag();
    this.props.ondropcallback(this, e, data)
  }

  onDragStart = (e, data) => {
    const rect = this.ref.current.getBoundingClientRect()
    this.props.startDrag(rect.width, rect.height, data.x - rect.x, data.y - rect.y)
  }

  onDrag = (e, data) => {
    this.setState({x: this.state.x + data.deltaX, y: this.state.y + data.deltaY})
    this.props.ondragcallback(this, e, data);
  }

  onResize = (e, data) => {
    // Ugly hack since react-resizable needs a size, but I need 100%
    // By doing this, and having a percentage size, it gives changes in size
    const delta_x = data.size.width - 100;
    const delta_y = data.size.height - 100;
    this.setState({w: this.state.w + delta_x, h: this.state.h + delta_y})
  }

  onResizeStop = (e, data) => {
    const rect = this.ref.current.getBoundingClientRect()
    const newData = {
      width: rect.width,
      height: rect.height,
      id: this.props.componentid
    }

    this.props.onresizestopcallback(this, e, newData);
  }

  render(){
    const {style, ondropcallback, ondragcallback, resizable, 
           startDrag, endDrag, ...props } = this.props;
    var new_style = {
      ...style, transform: "translate("+this.state.x+"px, "+this.state.y+"px)",
      width:  "calc(100% + " + this.state.w + "px)",
      height: "calc(100% + " + this.state.h + "px)"
    }
    if(resizable){
      return (
        <DraggableCore
          onStart={this.onDragStart}
          onStop={this.onDrop}
          onDrag={this.onDrag}
          cancel=".react-resizable-handle"
        >
          <Resizable
            onResize={this.onResize}
            onResizeStop={this.onResizeStop}
            width={100}
            height={100}
          >
            <div
              style={new_style}
              {...props}
              ref={this.ref}
            >
              {props.children}
            </div>
          </Resizable>
        </DraggableCore>
      );
    } else{
      return(
        <DraggableCore
          onStart={this.onDragStart}
          onStop={this.onDrop}
          onDrag={this.onDrag}
          cancel=".react-resizable-handle"
        >
          <div
            style={new_style}
            {...props}
            ref={this.ref}
          >
            {props.children}
          </div>
        </DraggableCore>
      );
    }
  }
}
const mapDispatchToProps = dispatch => ({
  startDrag: (width, height, grab_x, grab_y) => 
    dispatch(startDrag(width, height, grab_x, grab_y)),
  endDrag: () => 
    dispatch(endDrag()),
});

export default connect(null, mapDispatchToProps)(DraggableComponent)
