import React from 'react';
import PropTypes from 'prop-types';

export default class DragAndDropGrid extends React.Component {
  constructor(props){
    super(props)

    this.children = []
    this.rows = props.rows
    this.cols = props.columns
    this.divRef = React.createRef();
    this.state = {
      children: {},
      childrenPos: {}
    }
  }

  static displayName = 'DragAndDropGrid';

  static propTypes = {
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    isGrid: PropTypes.bool.isRequired
  }

  getGridPosition = (x, y) =>{
    const pos = this.divRef.current.getBoundingClientRect();
    const relativeX = x - pos.x;
    const relativeY = y - pos.y;
    const col = Math.floor(relativeX/(pos.width/this.cols))
    const row = Math.floor(relativeY/(pos.height/this.rows))

    return [col, row]
  }

  getDeepestGridElemAndPos = (x, y) => {
    var childE = null
    var row = -1;
    var col = -1;
    // This function assumes that you can not have overlapping grids.
    this.children.forEach(child => {
      if(child.props.isGrid){
        const [elem, childRow, childCol] = child.getDeepestGridElemAndPos(x, y)
        if(childRow >= 0 && childRow < this.rows &&
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
      const [row, col] = this.getGridPosition(x, y);
      if(row >= 0 && col < this.rows &&
         col >= 0 && col < this.cols){
        return [this, row, col];
      } else{
        return [null, null, null];
      }
    }
  }


  render(){
    return (
      <div {...this.props}
        ref={this.divRef}
      >
        {this.props.children}
  console  </div>
    )
  }
}
