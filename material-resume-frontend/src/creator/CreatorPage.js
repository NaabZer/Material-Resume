import React from 'react';
import ComponentSelector from './ComponentSelector';

export default class CreatorPage extends React.Component {
  state = {activeIndex: 0};

  handleActiveIndexUpdate = (activeIndex) => this.setState({activeIndex});
  render(){
    return (
      <div>
        <ComponentSelector/>
        <div style={{background: "blue"}}>
        </div>
      </div>
    )
  }
}
