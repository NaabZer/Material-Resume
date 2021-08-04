import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';


import { addComponent, moveComponent, resizeComponent, addPage } from '../actions/components';
import { loadAllEntries } from '../actions/entries';
import SettingsModal from './SettingsModal';

import ComponentSelector from './ComponentSelector';
import Page from './components/Page';

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

  componentDidUpdate(prevProps, prevState, snapshot){
  }

  render(){
    //Start load of entries
    if(!this.props.entries.isFetching && (!this.props.entries.text.fetched ||
       !this.props.entries.experience.fetched)){
      this.props.loadAllEntries();
    }

    var loaded = true;
    const entries = this.props.entries;
    loaded = loaded && !entries.isFetching && entries.text.fetched && entries.experience.fetched;
    let page_content;
    if(loaded){
      this.pages = [];
      const pages = this.props.pages.map( (id, i) => {
        this.pages.push(React.createRef());
        return(
          <Page 
            key={id}
            componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 1)}
            pageid={i}
            componentid={id}
            ref={this.pages[i]} 
          />
        );
      });
      page_content = 
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
    }else{
      page_content =
        <div
          style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}
        >
          <CircularProgress size={52}/>
        </div>
    }

    return (
      <div>
        <Route exact path='/creator/component/:id/settings'> 
          <SettingsModal/>
        </Route>
        <ComponentSelector
          componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 0)}
          style={{position: 'sticky', top: '0px'}}
        />
        {page_content}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  pages: state.components.pages,
  drag: state.dragAndDrop,
  entries: state.entries
});

const mapDispatchToProps = dispatch => ({
  addcomponent: (componentType, containerId, row, col, width, height) => 
    dispatch(addComponent(componentType, containerId, row, col, width, height)),
  movecomponent: (id, containerId, row, col) => 
    dispatch(moveComponent(id, containerId, row, col)),
  resizeComponent: (id, width, height) => dispatch(resizeComponent(id, width, height)),
  addPage: () => dispatch(addPage()),
  loadAllEntries: () => dispatch(loadAllEntries()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatorPage));
