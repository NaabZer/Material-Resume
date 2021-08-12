import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Card } from "@rmwc/card";
import { Button } from '@rmwc/button';

import DragAndDropGrid from '../DragAndDropGrid';

import { removePage } from '../../actions/components';

class Page extends React.Component {
  constructor(props){
    super(props)

    this.childGrids = []
    this.rows = props.rows
    this.cols = props.columns
    this.divRef = React.createRef();
  }

  static propTypes = {
    componentdropcallback: PropTypes.func.isRequired,
    pageid: PropTypes.number.isRequired,
    componentid: PropTypes.number.isRequired,
  }

  render(){
    const {componentdropcallback, settings, pageid, componentid, forwardedRef, ...props} = this.props;
    return(
      <div>
        <h2>
          Page {pageid+1}
        </h2>
        <Button
          raised
          onClick={() => this.props.removePage(componentid)}
        >
          Remove Page
        </Button>
        <Card
          outlined
          className='mdc-elevation--z4'
          style={{height: '297mm', width: '210mm'}}
        >
          <DragAndDropGrid 
            {...props}
            ref={forwardedRef}
            componentdropcallback={componentdropcallback}
            componentdragcallback={() => {}}
            isgrid={true}
            rows={settings.rows}
            columns={settings.cols}
            gap={settings.gap}
            componentid={componentid}
            style={{
              width: 'calc(100% - 2*'+settings.gap+")",
              height: 'calc(100% - 2*'+settings.gap+")",
            }}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.components.pageSettings,
});

const mapDispatchToProps = dispatch => ({
  removePage: (id) => dispatch(removePage(id)),
});

const forwardedPage = React.forwardRef((props, ref) =>{
  return <Page {...props} forwardedRef={ref} />
});
export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(forwardedPage);
