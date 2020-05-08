import React from 'react';
import { connect } from 'react-redux';

import { addComponent, moveComponent, resizeComponent, addPage } from '../actions/components';

import ComponentSelector from './ComponentSelector';
import DragAndDropGrid from './DragAndDropGrid';
import ResumePage from './ResumePage';

class CreatorPage extends React.Component {
  constructor(props){
    super(props);

    this.pages = [];
  }

  onDrop = (comp, e, data, type) => {
    const x = data.x - this.props.drag.grab_x;
    const y = data.y - this.props.drag.grab_y;
    var childE = null
    var row = -1;
    var col = -1;
    // This function assumes that you can not have overlapping grids.
    //const child = this.grid;
    this.pages.forEach(childRef => {
      const child = childRef.current;
      console.log(child);
      if(child.isgrid){
        const [elem, childCol, childRow] = child.getDeepestGridElemAndPos(x, y)
        if(elem !== null && childRow >= 0 && childRow < elem.rows &&
          childCol >= 0 && childCol < elem.cols){
          childE = elem;
          col = childCol;
          row = childRow;
          return
        }
      }
    });
    
    this.setState({x: 0, y: 0});
    if(childE !== null){
      if(type === 0){
        const [width, height] = childE.getClosestRowColSize(200, 200);
        this.props.addcomponent(1, childE.props.componentid, col, row, width, height);
      } else if (type ===1){
        const [width, height] = childE.getClosestRowColSize(this.props.drag.width, this.props.drag.height);
        this.props.movecomponent(data.id, childE.props.componentid, col, row);
        this.props.resizeComponent(data.id, width, height);
      }
    } 
  }

  render(){
    this.pages = [];
    const pages = this.props.pages.map( (id, i) => {
      this.pages.push(React.createRef());
      return(
        <ResumePage 
          key={id}
          componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 1)}
          pageid={id}
          ref={this.pages[i]} 
        />
      );
    });

    return (
      <div>
        <ComponentSelector
          componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 0)}
          style={{position: 'sticky', top: '0px'}}
        />
        <div
          style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}
        >
          {pages}
          <button
            onClick={()=> this.props.addPage()}
          >
            Add page
          </button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  pages: state.components.pages,
  drag: state.dragAndDrop
});

const mapDispatchToProps = dispatch => ({
  addcomponent: (componentType, containerId, row, col, width, height) => 
    dispatch(addComponent(componentType, containerId, row, col, width, height)),
  movecomponent: (id, containerId, row, col) => 
    dispatch(moveComponent(id, containerId, row, col)),
  resizeComponent: (id, width, height) => dispatch(resizeComponent(id, width, height)),
  addPage: () => dispatch(addPage())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatorPage);
