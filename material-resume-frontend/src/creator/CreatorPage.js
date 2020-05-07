import React from 'react';
import ComponentSelector from './ComponentSelector';
import DragAndDropGrid from './DragAndDropGrid';
import { connect } from 'react-redux';
import { addComponent, moveComponent, resizeComponent } from '../actions/components';

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
      x: 0,
      y: 0,
    }
  }

  onDrop = (comp, e, data, type) => {
    const x = data.x - this.props.drag.grab_x;
    const y = data.y - this.props.drag.grab_y;
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
          childE = elem;
          col = childCol;
          row = childRow;
          return
        }
      }
    });
    
    this.setState({x: 0, y: 0});
    if(childE !== null){
      if(type === 0){
        const [width, height] = childE.getClosestRowColSize(200, 200);
        this.props.addcomponent(1, childE.props.componentid, col, row, width, height);
      } else if (type ===1){
        const [width, height] = childE.getClosestRowColSize(this.props.drag.width, this.props.drag.height);
        this.props.movecomponent(data.id, childE.props.componentid, col, row);
        this.props.resizeComponent(data.id, width, height);
      }
    } 
  }

  handleChange = e => {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({[name]: Number(value)})
  }

  addComp = e =>{
    e.preventDefault();
    const {type, row, col, width, height} = this.state;
    this.props.addcomponent(type, 0, row, col, width, height);
  }

  render(){
    return (
      <div>
        <div
          style={{
            position: "fixed", transform: "translate("+this.state.x+"px, "+this.state.y+"px)",
            background: 'blue', width: '10px', height: '10px', top: "0px", left: "0px"}}
        />
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
        <DragAndDropGrid 
          componentdropcallback={(c, e, d) => this.onDrop(c, e, d, 1)}
          isgrid={true}
          rows={3}
          columns={3}
          componentid={1}
          ref={ref => this.grid2 = ref} 
          name="red" 
          style={{background: "red", height: '200px'}}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  components: state.components.components,
  grids: state.components.grids,
  drag: state.dragAndDrop
});

const mapDispatchToProps = dispatch => ({
  addcomponent: (componentType, containerId, row, col, width, height) => 
    dispatch(addComponent(componentType, containerId, row, col, width, height)),
  movecomponent: (id, containerId, row, col) => 
    dispatch(moveComponent(id, containerId, row, col)),
  resizeComponent: (id, width, height) => dispatch(resizeComponent(id, width, height))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatorPage);
