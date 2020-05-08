import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addComponent, resizeComponent } from '../actions/components';
import DraggableComponent from './components/DraggableComponent';
import CardComponent from './components/CardComponent.js';
import { getComponentFromType} from './components/ComponentFactory';

 
class DragAndDropGrid extends React.Component {
  constructor(props){
    super(props)

    this.childGrids = []
    this.rows = props.rows
    this.cols = props.columns
    this.divRef = React.createRef();
  }

  static displayName = 'DragAndDropGrid';

  static propTypes = {
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    gap: PropTypes.string.isRequired,
    isgrid: PropTypes.bool.isRequired,
    componentdragcallback: PropTypes.func.isRequired,
    componentdropcallback: PropTypes.func.isRequired,
  }

  getGridPosition = (x, y) =>{
    const rect = this.divRef.current.getBoundingClientRect();
    const colSize = rect.width/this.cols
    const rowSize = rect.height/this.rows;
    const relativeX = x - rect.x;
    const relativeY = y - rect.y;
    const col = Math.round(relativeX/colSize)
    const row = Math.round(relativeY/rowSize)

    return [col, row]
  }

  getDeepestGridElemAndPos = (x, y, excludeIds=[]) => {
    var childE = null
    var row = -1;
    var col = -1;
    // This function assumes that you can not have overlapping grids.
    this.childGrids.forEach(childRef => {
      const child = childRef.current;
      if(child && child.props.isgrid){
        const [elem, childCol, childRow] = child.getDeepestGridElemAndPos(x, y, excludeIds)
        if(elem !== null && !excludeIds.includes(elem.props.componentid) && 
            childRow >= 0 && childRow < this.rows &&
            childCol >= 0 && childCol < this.cols){
          childE = elem;
          row = childRow;
          col = childCol;
          return;
        }
      }
    });
    
    if(childE !== null){
      return [childE, row, col];
    } else{
      const [col, row] = this.getGridPosition(x, y);
      if(!excludeIds.includes(this.props.componentid) && row >= 0 && row < this.rows &&
         col >= 0 && col < this.cols){
        return [this, col, row];
      } else{
        return [null, null, null];
      }
    }
  }

  getClosestRowColSize = (width, height) => {
    const rect = this.divRef.current.getBoundingClientRect();
    const colSize = rect.width/this.cols
    const rowSize = rect.height/this.rows;
    const closestCol = Math.min(this.cols, Math.max(1, Math.round(width/colSize)));
    const closestRow = Math.min(this.rows, Math.max(1, Math.round(height/rowSize)));

    return [closestCol, closestRow];
  }

  componentDragCallback = (elem, e, data) =>{
    this.props.componentdragcallback(elem, e, data);
  }

  componentDropCallback = (elem, e, data) =>{
    elem.resetPos();
    this.props.componentdropcallback(elem, e, data);
  }

  componentResizeStopCallback = (elem, e, data) =>{
    elem.resetSize();
    const [width, height] = this.getClosestRowColSize (data.width, data.height);
    this.props.resizeComponent(data.id, width, height)
  };


  render(){
    const grid = this.props.grids[this.props.componentid] || []
    this.childGrids = [];
    const children = grid.map(elemId => {
      const elem = this.props.components[elemId]
      const style = {
        gridRow: (elem.row + 1) + " / span " + elem.height,
        gridColumn: (elem.col + 1) + " / span " + elem.width
      }

      const Component = getComponentFromType(elem.componentType);
      const ref = React.createRef();
      if(Component.isGrid){
        this.childGrids.push(ref);
      }

      return (
        <DraggableComponent
          key={elemId}
          componentid={elemId}
          ondragcallback={e => {}}
          ondropcallback={this.componentDropCallback}
          onresizestopcallback={this.componentResizeStopCallback}
          editable={true}
          style={style}
          ref={ref}
          componenttype={elem.componentType}
        />
      )
    })

    const rowStyle = "minmax(0, 1fr) ".repeat(this.rows);
    const colStyle = "minmax(0, 1fr) ".repeat(this.cols);
    const {grids, components, isgrid, style, addcomponent, resizeComponent,
      componentdragcallback, componentdropcallback, gap, drag, dispatch,
      ...props} = this.props
    return (
      <div 
        {...props}
        ref={this.divRef}
        className="drag-and-drop-grid"
        style={{
          ...style,
          gridTemplateColumns: colStyle,
          gridTemplateRows: rowStyle,
          gap: gap,
          padding: gap,
        }}
      >
        {children}
      </div>
    )
  }
}

// TODO: optimize for only current grid
const mapStateToProps = state => ({
  components: state.components.components,
  grids: state.components.grids,
  drag: state.dragAndDrop
});

const mapDispatchToProps = dispatch => ({
  addcomponent: (componentType, containerId, row, col, width, height) => 
    dispatch(addComponent(componentType, containerId, row, col, width, height)),
  resizeComponent: (id, width, height) => dispatch(resizeComponent(id, width, height))
});

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(DragAndDropGrid);
