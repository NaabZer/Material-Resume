import React from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(GridLayout);

class ResumeGrid extends React.Component {

  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    return (
      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div style={{background: 'red'}} key="a">a</div>
        <div style={{background: 'blue'}} key="b">b</div>
        <div style={{background: 'green'}} key="c">c</div>
      </ReactGridLayout>
    )
  }
}

export default ResumeGrid;
