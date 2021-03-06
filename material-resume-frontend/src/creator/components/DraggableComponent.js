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
import { Elevation } from "@rmwc/elevation"; 
import { Typography } from '@rmwc/typography';
import { IconButton } from '@rmwc/icon-button';

import '../../stylesheets/components/draggable-component.scss';

class DraggableComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {x: 0, y: 0, w: 0, h: 0, resizing: false, z: 4}
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
    this.setState({z: 4})
  }

  onDragStart = (e, data) => {
    e.stopPropagation();
    const rect = this.ref.current.getBoundingClientRect();
    this.setState({z: 12})
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
           componenttype, deleteComponent, forwardedRef, gap, ...props } = this.props;
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

    const InnerComponentType = getComponentFromType(this.props.componenttype);
    const settings = this.props.settings || {
      ...InnerComponentType.defaultSettings, ...defaultCommonSettings
    };
    let leftMargin = 0
    let topMargin = 0
    let addedWidth = 0
    let addedHeight = 0
    if('ignoreGap' in settings && editable === true){
      const ignoreLeft = (settings.ignoreGap & 8) > 0;
      const ignoreTop = (settings.ignoreGap & 4) > 0;
      const ignoreRight = (settings.ignoreGap & 2) > 0;
      const ignoreBottom = (settings.ignoreGap & 1) > 0;
      const gapNum = gap.slice(0, -2)
      leftMargin = ignoreLeft ? -gapNum + "px" : '0';
      topMargin = ignoreTop ?  -gapNum + "px" : '0';
      addedWidth = gapNum * (ignoreLeft + ignoreRight)
      addedHeight = gapNum * (ignoreTop + ignoreBottom)
    }

    var new_style = {
      ...style, transform: "translate("+this.state.x+"px, "+this.state.y+"px)",
      width:  "calc(100% + " + (this.state.w + addedWidth) + "px)",
      height: "calc(100% + " + (this.state.h + addedHeight) + "px)",
      zIndex: this.state.z,
      marginTop: topMargin,
      marginLeft: leftMargin
    }

    //const InnerComponent = 

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
                    pathname:"/resumes/creator/component/" + this.props.componentid + "/settings",
                  }}
                >
                  <IconButton
                    className='draggable-component-settings'
                    icon='settings'
                  />
                </Link>
              </div>
              <InnerComponentType
                settings={settings} 
                ondropcallback={this.onDrop}
                componentid={this.props.componentid}
                elevation={this.state.z}
                ref={forwardedRef}
              />
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

export const defaultCommonSettings = {
  // Binary representation, 1 is true, 0 is false in the order of left, top, right, bottom
  ignoreGap: 0,
  elevation: 0,
}

export class CommonSettingsForm extends React.Component {
  constructor(props){
    super(props);

    this.state = this.props.settings;
  }

  onChange = (type, e) =>{
    this.setState({[type]: e.currentTarget.value});
  }

  setGapIgnore = (pos) => {
    switch(pos){
      case 'left':{
        this.setState({ignoreGap: this.state.ignoreGap ^ 8})
        break;
      }
      case 'top':{
        this.setState({ignoreGap: this.state.ignoreGap ^ 4})
        break;
      }
      case 'right':{
        this.setState({ignoreGap: this.state.ignoreGap ^ 2})
        break;
      }
      case 'bottom':{
        this.setState({ignoreGap: this.state.ignoreGap ^ 1})
        break;
      }
      default: break;
    }
  }

  getSettings = () =>{
    return(this.state);
  }

  render(){
    return(
      <div
        style={{width: '100%'}}
      >
        <Typography use='subtitle1'>Ignore grid gap</Typography>
        <div
          style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
        >
          <IconButton
            icon='first_page'
            className={(this.state.ignoreGap & 8) > 0 ?
                'mdc-elevation--z4 icon-button-on' : 'icon-button-off'}
            onClick={() => this.setGapIgnore('left')}
          />
          <IconButton
            icon='vertical_align_top'
            className={(this.state.ignoreGap & 4) > 0 ?
                'mdc-elevation--z4 icon-button-on' : 'icon-button-off'}
            onClick={() => this.setGapIgnore('top')}
          />
          <IconButton
            icon='last_page'
            className={(this.state.ignoreGap & 2) > 0 ?
                'mdc-elevation--z4 icon-button-on' : 'icon-button-off'}
            onClick={() => this.setGapIgnore('right')}
          />
          <IconButton
            icon='vertical_align_bottom'
            className={(this.state.ignoreGap & 1) > 0 ?
                'mdc-elevation--z4 icon-button-on' : 'icon-button-off'}
            onClick={() => this.setGapIgnore('bottom')}
          />
        </div>
      </div>
    );
  }
}
