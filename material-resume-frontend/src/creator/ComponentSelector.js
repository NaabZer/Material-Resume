import React from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';

import './ComponentSelector.scss';

import CardComponent from './components/CardComponent.js';
import DraggableComponent from './components/DraggableComponent.js';

export default class ComponentSelector extends React.Component {
  state = {activeIndex: 0};
  
  onComponentDrag = (comp, e, data) => {
    
  }

  onComponentDrop = (comp, e, data) => {
    comp.resetPos();
    this.props.componentdropcallback(comp, e, data);
  }



  handleActiveIndexUpdate = (activeIndex) => this.setState({activeIndex});
  render(){
    return (
      <div className='component-selector'>
        <TabBar
          activeIndex={this.state.activeIndex}
          handleActiveIndexUpdate={this.handleActiveIndexUpdate}
        >
          <Tab>
            <span className='mdc-tab__text-label'>One</span>
          </Tab>
          <Tab>
            <span className='mdc-tab__text-label'>Two</span>
          </Tab>
        </TabBar>
        <div className='component-selector-components'>
          <DraggableComponent
            ondropcallback={this.onComponentDrop}
            ondragcallback={this.onComponentDrag}
          >
            <CardComponent/>
          </DraggableComponent>
        </div>
      </div>
    )
  }
}
