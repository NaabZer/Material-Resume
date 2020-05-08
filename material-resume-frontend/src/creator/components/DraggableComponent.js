import React from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';
import { Resizable } from 'react-resizable';
import { connect } from 'react-redux';

import { startDrag, endDrag } from '../../actions/dragAndDrop';
import { deleteComponent } from '../../actions/components';
import { getComponentFromType } from './ComponentFactory';

import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
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

  onDrop = (e, data) => {
    if('componentid' in this.props){
      data.id = this.props.componentid;
    }
    this.props.endDrag();
    this.props.ondropcallback(this, e, data)
  }

  onDragStart = (e, data) => {
    const rect = this.ref.current.getBoundingClientRect();
    this.props.startDrag(this.props.componenttype, this.props.componentid, rect.width,
      rect.height, data.x - rect.x, data.y - rect.y);
    //e.preventDefault();
  }

  onDrag = (e, data) => {
    this.setState({x: this.state.x + data.deltaX, y: this.state.y + data.deltaY})
    this.props.ondragcallback(this, e, data);
    //e.preventDefault();
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
        cancel=".react-resizable-handle"
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
            <IconButton
              className='draggable-component-close'
              onClick={() => this.props.deleteComponent(this.props.componentid)}
            >
              <MaterialIcon icon='close' />
            </IconButton>
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
    settings: state.components.componentSettings[id]
  })
}

const mapDispatchToProps = dispatch => ({
  startDrag: (componentType, componentId, width, height, grab_x, grab_y) => 
    dispatch(startDrag(componentType, componentId, width, height, grab_x, grab_y)),
  endDrag: () => dispatch(endDrag()),
  deleteComponent: (id) => dispatch(deleteComponent(id)),
});

const forwardedDraggableComponent = React.forwardRef((props, ref) =>{
  return <DraggableComponent {...props} forwardedRef={ref} />
});

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(forwardedDraggableComponent)
