import React from 'react';
import ComponentSelector from './ComponentSelector';
import DragAndDropGrid from './DragAndDropGrid';

export default class CreatorPage extends React.Component {
  constructor(props){
    super(props);

    this.grids = [];
  }

  componentDidMount(){
    this.grids[1].children.push(this.nestedGrid);
  }

  onClick = e => {
    var hovered = null;
    this.grids.some(grid => {
      const comp = grid.getHoveredComponent()
      if(comp !== null){
        hovered = comp;
        return true;
      }
    })

    if(hovered !== null){
      console.log("Clicked " + hovered.props.name);
    } else{
      console.log("Clickede no grid");
    }
  }

  render(){
    return (
      <div
        onClick={this.onClick}
      >
        <ComponentSelector/>
        <DragAndDropGrid 
          ref={ref => this.grids.push(ref)} 
          name="green" 
          style={{background: "green", height: '200px'}}
        />
        <DragAndDropGrid 
          ref={ref => this.grids.push(ref)} 
          name="blue" 
          style={{background: "blue", height: '2000px'}}
        >
          <DragAndDropGrid 
            ref={ref => this.nestedGrid = ref}
            name="red" 
            style={{background: "red", width: '50%', height: '100%'}}
          />
        </DragAndDropGrid>
        <div style={{background: "grey", height: '200px'}}/>
      </div>
    )
  }
}
