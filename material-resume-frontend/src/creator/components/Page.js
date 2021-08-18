import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Page.scss';

import { Card } from "@rmwc/card";
import { Icon } from '@rmwc/icon';

import DragAndDropGrid from '../DragAndDropGrid';
import ConfirmModal from '../../utility/ConfirmModal';

import { removePage } from '../../actions/components';

class Page extends React.Component {
  constructor(props){
    super(props)

    this.childGrids = []
    this.divRef = React.createRef();
    this.state = {confirmOpen: false}
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
        <ConfirmModal 
          open={this.state.confirmOpen}
          text='Remove page?'
          subtitle='Are you sure?'
          cancelClickCallback={() => this.setState({confirmOpen: false})}
          confirmClickCallback={() => this.props.removePage(componentid)}
        />
        <h2>
          Page {pageid+1}
        </h2>
        <div
          style={{display: 'flex'}}
        >
          <Card
            outlined
            className='mdc-elevation--z8'
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
          <div 
            className='page-settings mdc-elevation--z4'
          >
            <Icon 
              icon="delete"
              onClick={() => this.setState({confirmOpen: true})}
            />
            <Icon 
              icon="settings"
            />
          </div>
        </div>
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
