import React from 'react';
import ComponentSelector from './ComponentSelector';
import DragAndDropGrid from './DragAndDropGrid';
import DraggableComponent from './components/DraggableComponent';

export default class CreatorPage extends React.Component {
  constructor(props){
    super(props);

    this.grids = [];
  }

  componentDidMount(){
    this.grids[1].children.push(this.nestedGrid);
    window.addEventListener('mousedown', this.onMouseDown, true)
  }

  onClick = e => {
    const x = e.clientX;
    const y = e.clientY;
    var childE = null
    var row = -1;
    var col = -1;
    // This function assumes that you can not have overlapping grids.
    this.grids.forEach(child => {
      if(child.props.isGrid){
        const [elem, childRow, childCol] = child.getDeepestGridElemAndPos(x, y)
        if(elem !== null){
          childE = elem;
          row = childRow;
          col = childCol;
          return;
        }
      }
    });
    
    if(childE !== null){
      console.log("Clicked at: " + row + ", " + col);
      console.log(e);
    } else{
      console.log("No grid clicked");
    }
  }

  onMouseDown = e => {
    console.log("Draggin");
    window.addEventListener('mouseup', this.onMouseUp, true)
    window.addEventListener('dragend', this.onMouseUp, true)
  }

  onMouseUp = e => {
    console.log("Stop Draggin");
    window.removeEventListener('mouseup', this.onMouseUp, true)
    window.removeEventListener('dragend', this.onMouseUp, true)
  }

  render(){
    return (
      <div
        onClick={this.onClick}
      >
        <ComponentSelector/>
        <DragAndDropGrid 
          isGrid={true}
          rows={2}
          columns={4}
          ref={ref => this.grids.push(ref)} 
          name="green" 
          style={{background: "green", height: '200px'}}
        />
        <DragAndDropGrid 
          isGrid={true}
          rows={12}
          columns={12}
          ref={ref => this.grids.push(ref)} 
          name="blue" 
          style={{background: "blue", height: '2000px'}}
        >
          <DragAndDropGrid 
            isGrid={true}
            rows={12}
            columns={12}
            ref={ref => this.nestedGrid = ref}
            name="red" 
            style={{background: "red", width: '50%', height: '100%'}}
          />
        </DragAndDropGrid>
        <div style={{background: "grey", height: '200px'}}/>
        <DraggableComponent
          style={{background: "black", height: '200px'}}/>
        />
      </div>
    )
  }
}
