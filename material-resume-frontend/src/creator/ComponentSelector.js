import React from 'react';
import { Tab, TabBar } from '@rmwc/tabs';
import { ListDivider } from '@rmwc/list';
import { Typography } from '@rmwc/typography';

import './ComponentSelector.scss';

import { 
  ExperienceList,
  TextList,
  ContainerList,
  OtherList,
  getComponentFromType
} from './components/ComponentFactory';
import DraggableComponent from './components/DraggableComponent.js';


export default class ComponentSelector extends React.Component {
  state = {activeIndex: 0};
  
  onComponentDrag = (comp, e, data) => {
    
  }

  onComponentDrop = (comp, e, data) => {
    comp.resetPos();
    this.props.componentdropcallback(comp, e, data);
  }

  handleActiveIndexUpdate = (e) => {
    console.log(e.detail.index)
    this.setState({activeIndex: e.detail.index});
  }

  render(){
    const {componentdropcallback, className, ...props} = this.props;
    const nClassName = className + ' component-selector';
    let componentList;
    if(this.state.activeIndex === 0){
      componentList = ExperienceList;
    } else if(this.state.activeIndex === 1){
      componentList = TextList
    } else if(this.state.activeIndex === 2){
      componentList = ContainerList
    } else{
      componentList = OtherList
    }
    const components = componentList.map(type => {
      return (
        <div key={type}>
          <DraggableComponent
            ondropcallback={this.onComponentDrop}
            ondragcallback={this.onComponentDrag}
            componenttype={type}
          />
          <Typography
            use='subtitle2'
            style={{padding: "8px", display:'flex', justifyContent: 'center'}}
          >
            {getComponentFromType(type).Name}
          </Typography>
        </div>
      );
    });
    return (
      <div 
        {...props}
        className={nClassName}
      >
        <TabBar
          activeIndex={this.state.activeIndex}
          onActivate={this.handleActiveIndexUpdate}
        >
          <Tab>
            <span className='mdc-tab__text-label'>Experiences</span>
          </Tab>
          <Tab>
            <span className='mdc-tab__text-label'>Text</span>
          </Tab>
          <Tab>
            <span className='mdc-tab__text-label'>Containers</span>
          </Tab>
          <Tab>
            <span className='mdc-tab__text-label'>Other</span>
          </Tab>
        </TabBar>
        <ListDivider 
          style={{listStyleType: 'none'}}
        />
        <div className='component-selector-components'>
          {components}
        </div>
      </div>
    )
  }
}
