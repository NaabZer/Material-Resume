import React from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';

import CardComponent from './components/CardComponent.js';

const ReactGridLayout = WidthProvider(GridLayout);

class ResumeGrid extends React.Component {
  constructor(props){
    super(props);

    this.componentI = 1;
    this.state = {
      components: [ {i: "0", Type: CardComponent} ],
      layout: [ {i: "0", x: 0, y: 0, w: 5, h: 4} ]
    };
  }

  onDrop = elemParams => {

    this.setState((state,props) => {
      return {
        components: [...this.state.components, {i: this.componentI.toString(), Type: CardComponent}],
        layout: [...this.state.layout,
          {i: this.componentI.toString(),
           x: elemParams.x,
           y: elemParams.y,
           w: elemParams.w,
           h: elemParams.h
          }]
      }
    });
    this.componentI++;
  };

  render() {
    const components = this.state.components.map((elem) =>
      <div key={elem.i}>
        <elem.Type/>
      </div>
    );

    return (
      <ReactGridLayout 
        className="layout" 
        layout={this.state.layout} 
        cols={12} 
        rowHeight={30} 
        width={1200}
        isDroppable={true}
        onDrop={this.onDrop}
        droppingItem={{i: "-1", w: 3, h: 4}}
      >
        {components}
      </ReactGridLayout>
    )
  }
}

export default ResumeGrid;
