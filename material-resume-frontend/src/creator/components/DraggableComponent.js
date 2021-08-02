import React from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';
import { Resizable } from 'react-resizable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startDrag, endDrag } from '../../actions/dragAndDrop';
import { deleteComponent } from '../../actions/components';
import { getComponentFromType } from './ComponentFactory';
import { withRouterAndRef } from '../../utility/utilityFunctions';

import { IconButton } from '@rmwc/icon-button';
import '../../stylesheets/components/draggable-component.scss';

class DraggableComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {x: 0, y: 0, w: 0, h: 0, resizing: false}
    this.ref = React.createRef();
  }


  static propTypes = {
    ondropcallback: PropTypes.func.isRequired,
    ondragcallback: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    componentid: PropTypes.number,
    componenttype: PropTypes.string.isRequired,
  }

  resetPos = () =>{
    this.setState({x: 0, y: 0})
  }

  resetSize = () => {
    this.setState({w: 0, h: 0})
  }

  onDrop = (e, data, data2) => {
    if(this.props.dragAndDrop.componentId !== this.props.componentid){
      this.props.endDrag();
    }
    if(typeof(data2) !== 'undefined'){
      // If there are only two parameters, this is the original draggable elements drop function
      this.props.ondropcallback(e, data, data2)
    } else{
      // If there are three elements, this is the function passed down through DragAndDropGrid
      // from CreatorPage, that handles dropping items.
      if('componentid' in this.props){
        data.id = this.props.componentid;
      }
      this.props.ondropcallback(this, e, data)
    }
  }

  onDragStart = (e, data) => {
    e.stopPropagation();
    const rect = this.ref.current.getBoundingClientRect();
    this.props.startDrag(this.props.componenttype, this.props.componentid, rect.width,
      rect.height, data.x - rect.x, data.y - rect.y);
  }

  onDrag = (e, data) => {
    //e.stopPropagation();
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
    this.setState({resizing: false});
    this.props.onresizestopcallback(this, e, newData);
  }
  
  onResizeStart = (e, data) => {
    this.setState({resizing: true});
  }

  render(){
    const {style, ondropcallback, ondragcallback, resizable, 
           startDrag, endDrag, className, editable, onresizestopcallback,
           componenttype, deleteComponent, forwardedRef, ...props } = this.props;
    var classNames = className || "";
    classNames += " draggable-component";

    if(editable === true){
      classNames += " draggable-component-editable";
    } else{
      classNames += " draggable-component-uneditable";
    }

    if(this.state.resizing === true){
      classNames += " draggable-component-resizing";
    }

    var new_style = {
      ...style, transform: "translate("+this.state.x+"px, "+this.state.y+"px)",
      width:  "calc(100% + " + this.state.w + "px)",
      height: "calc(100% + " + this.state.h + "px)",
    }

    const InnerComponentType = getComponentFromType(this.props.componenttype);
    const settings = this.props.settings || InnerComponentType.defaultSettings
    const InnerComponent = 
      <InnerComponentType
        settings={settings} 
        ondropcallback={this.onDrop}
        componentid={this.props.componentid}
        ref={forwardedRef}
      />;

    return (
      <DraggableCore
        onStart={this.onDragStart}
        onStop={this.onDrop}
        onDrag={this.onDrag}
        cancel=".react-resizable-handle, .mdc-icon-button"
        >
        <Resizable
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
          onResizeStart={this.onResizeStart}
          width={100}
          height={100}
        >
          <div
            style={new_style}
            className={classNames}
            ref={this.ref}
            {...props}
          >
            <div className='draggable-component-buttons'>
              <IconButton
                className='draggable-component-close'
                onClick={() => this.props.deleteComponent(this.props.componentid)}
                icon='close'
              />
              <Link
                style={{color: 'black', decoration: 'none'}}
                to={{
                  pathname:"/creator/component/" + this.props.componentid + "/settings",
                }}
              >
                <IconButton
                  className='draggable-component-settings'
                  icon='settings'
                />
              </Link>
            </div>
            {InnerComponent}
          </div>
        </Resizable>
      </DraggableCore>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.componentid;
  return({
    settings: state.components.componentSettings[id],
    dragAndDrop: state.dragAndDrop
  })
}

const mapDispatchToProps = dispatch => ({
  startDrag: (componentType, componentId, width, height, grab_x, grab_y) => 
    dispatch(startDrag(componentType, componentId, width, height, grab_x, grab_y)),
  endDrag: () => dispatch(endDrag()),
  deleteComponent: (id) => dispatch(deleteComponent(id)),
});

const forwardedDraggableComponent = withRouterAndRef(DraggableComponent);

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(forwardedDraggableComponent);
