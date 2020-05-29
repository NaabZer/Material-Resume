import React from 'react';
import { Tab, TabBar } from '@rmwc/tabs';

import './ComponentSelector.scss';

import { componentList, getComponentFromType } from './components/ComponentFactory';
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
    const {componentdropcallback, className, ...props} = this.props;
    const nClassName = className + ' component-selector';
    const components = componentList.map(type => {
      return (
        <DraggableComponent
          ondropcallback={this.onComponentDrop}
          ondragcallback={this.onComponentDrag}
          key={type}
          componenttype={type}
        />
      );
    });
    return (
      <div 
        {...props}
        className={nClassName}
      >
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
          {components}
        </div>
      </div>
    )
  }
}
