import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from "@material/react-card";

import DragAndDropGrid from './DragAndDropGrid';

class ResumePage extends React.Component {
  constructor(props){
    super(props)

    this.isgrid = true;
    this.gridRef = React.createRef();
  }

  static propTypes = {
    componentdropcallback: PropTypes.func.isRequired,
    pageid: PropTypes.number.isRequired
  }


  getGridPosition = (x, y) =>{
    return this.gridRef.current.getGridPosition(x, y);
  }

  getDeepestGridElemAndPos = (x, y) => {
    console.log(this.gridRef.current)
    return this.gridRef.current.getDeepestGridElemAndPos(x, y);
  }

  getClosestRowColSize = (width, height) => {
    return this.gridRef.current.getClosestRowColSize(width, height);
  }

  render(){
    const {componentdropcallback, settings, pageid, ...props} = this.props;
    return(

      <Card
        outlined
        className='mdc-elevation--z4'
        style={{height: '297mm', width: '210mm'}}
      >
        <DragAndDropGrid 
          {...props}
          ref={this.gridRef}
          componentdropcallback={componentdropcallback}
          isgrid={true}
          rows={settings.rows}
          columns={settings.cols}
          gap={settings.gap}
          componentid={pageid}
          style={{
            width: 'calc(100% - 2*'+settings.gap+")",
            height: 'calc(100% - 2*'+settings.gap+")",
          }}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.components.pageSettings,
});


export default connect(mapStateToProps, null, null, {forwardRef: true})(ResumePage);
