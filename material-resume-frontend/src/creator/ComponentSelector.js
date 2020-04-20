import React from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import './ComponentSelector.scss';

export default class ComponentSelector extends React.Component {
  state = {activeIndex: 0};

  handleActiveIndexUpdate = (activeIndex) => this.setState({activeIndex});
  render(){
    return (
      <div class='component-selector'>
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
        <div class='component-selector-components'>

        </div>
      </div>
    )
  }
}
