import React from 'react';
import ResumeGrid from './ResumeGrid';
import ComponentSelector from './ComponentSelector';

export default class CreatorPage extends React.Component {
  state = {activeIndex: 0};

  handleActiveIndexUpdate = (activeIndex) => this.setState({activeIndex});
  render(){
    return (
      <div>
        <ComponentSelector/>
        <ResumeGrid/>
      </div>
    )
  }
}
