import React from 'react';
import ComponentSelector from './ComponentSelector';
import DragAndDropGrid from './DragAndDropGrid';
import DraggableComponent from './components/DraggableComponent';
import { connect } from 'react-redux';
import { addComponent, moveComponent } from '../actions/components';

class CreatorPage extends React.Component {
  constructor(props){
    super(props);

    this.grid1 = null;
    this.grid2 = null;
    this.state = {
      type: 1,
      row: 1,
      col: 1,
      width: 1,
      height: 1,
    }
  }

  onDrop = (comp, e, data, type) => {
    const x = data.x;
    const y = data.y;
    var childE = null
    var row = -1;
    var col = -1;
    // This function assumes that you can not have overlapping grids.
    //const child = this.grid;
    [this.grid1, this.grid2].forEach(child => {
      if(child.props.isgrid){
        const [elem, childCol, childRow] = child.getDeepestGridElemAndPos(x, y)
        if(elem !== null && childRow >= 0 && childRow < elem.rows &&
          childCol >= 0 && childCol < elem.cols){
          console.log(elem.props.name + ": " +childRow + ", " + childCol);
          childE = elem;
          col = childCol;
          row = childRow;
          return
        }
      }
    });
    
    if(childE !== null){
      if(type === 0){
        this.props.addcomponent(1, childE.props.componentid, col, row, 1, 1);
      } else if (type ===1){
        console.log("this is id: " + childE.props.componentid);
        this.props.movecomponent(data.id, childE.props.componentid, col, row);
      }
    } else{
      console.log("No grid clicked");
    }
  }

  handleChange = e => {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({[name]: value})
  }

  addComp = e =>{
    e.preventDefault();
    const {type, row, col, width, height} = this.state;
    this.props.addcomponent(type, 0, row, col, width, height);
  }

  render(){
    return (
      <div>
        <ComponentSelector
          componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 0)}
        />
        <form
          onSubmit={this.addComp}
        >
          <input type='number' name='type'
            value={this.state.type}
            onChange={this.handleChange}
          />
          <input type='number' name='row'
            value={this.state.row}
            onChange={this.handleChange}
          />
          <input type='number' name='col'
            value={this.state.col}
            onChange={this.handleChange}
          />
          <input type='number' name='width'
            value={this.state.width}
            onChange={this.handleChange}
          />
          <input type='number' name='height'
            value={this.state.height}
            onChange={this.handleChange}
          />

          <input type="submit" value="Submit" />
        </form>
        <DragAndDropGrid 
          componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 1)}
          isgrid={true}
          rows={6}
          columns={12}
          componentid={0}
          ref={ref => this.grid1 = ref} 
          name="green" 
          style={{background: "green", height: '400px'}}
        />
        <div style={{background: "grey", height: '200px'}}/>
        <DragAndDropGrid 
          componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 1)}
          isgrid={true}
          rows={6}
          columns={12}
          componentid={1}
          ref={ref => this.grid2 = ref} 
          name="red" 
          style={{background: "red", height: '400px'}}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  components: state.components.components,
  grids: state.components.grids
});

const mapDispatchToProps = dispatch => ({
  addcomponent: (componentType, containerId, row, col, width, height) => 
    dispatch(addComponent(componentType, containerId, row, col, width, height)),
  movecomponent: (id, containerId, row, col) => 
    dispatch(moveComponent(id, containerId, row, col))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatorPage);
