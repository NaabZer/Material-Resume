import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from "@material/react-card";

import DragAndDropGrid from './DragAndDropGrid';

class ResumePage extends React.Component {
  static propTypes = {
    componentdropcallback: PropTypes.func.isRequired,
    pageid: PropTypes.number.isRequired
  }

  render(){
    const {componentdropcallback, settings, pageid, forwardedRef, ...props} = this.props;
    return(

      <Card
        outlined
        className='mdc-elevation--z4'
        style={{height: '297mm', width: '210mm'}}
      >
        <DragAndDropGrid 
          {...props}
          ref={forwardedRef}
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


const forwardedResumePage = React.forwardRef((props, ref) =>{
  return <ResumePage {...props} forwardedRef={ref} />
});
export default connect(mapStateToProps, null, null, {forwardRef: true})(forwardedResumePage);
