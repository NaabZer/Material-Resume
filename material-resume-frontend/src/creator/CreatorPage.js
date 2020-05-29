import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { Button } from '@rmwc/button';

import { addComponent, moveComponent, resizeComponent, addPage } from '../actions/components';
import SettingsModal from './SettingsModal';

import ComponentSelector from './ComponentSelector';
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
    var excludedIds = [];
    if(this.props.drag.componentId){
      excludedIds = [this.props.drag.componentId]
    }
    this.pages.forEach(childRef => {
      const child = childRef.current;
      if(child.props.isgrid){
        const [elem, childCol, childRow] = child.getDeepestGridElemAndPos(x, y, excludedIds)
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
        this.props.addcomponent(this.props.drag.componentType, childE.props.componentid, col, row, width, height);
      } else if (type ===1){
        const [width, height] = childE.getClosestRowColSize(this.props.drag.width, this.props.drag.height);
        this.props.movecomponent(data.id, childE.props.componentid, col, row);
        this.props.resizeComponent(data.id, width, height);
      }
    } 
  }

  render(){

    let background = this.props.location.state && this.props.location.state.background;
    console.log(background);

    this.pages = [];
    const pages = this.props.pages.map( (id, i) => {
      this.pages.push(React.createRef());
      return(
        <ResumePage 
          key={id}
          componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 1)}
          pageid={i}
          componentid={id}
          ref={this.pages[i]} 
        />
      );
    });

    return (
      <div>
        {background && <Route path='/component/:id/settings' children={<SettingsModal/>} />}
        <ComponentSelector
          componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 0)}
          style={{position: 'sticky', top: '0px'}}
        />
        <div
          style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}
        >
          {pages}
          <Button
            raised
            onClick={()=> this.props.addPage()}
            style={{margin: '8px'}}
          >
            Add page
          </Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatorPage));
