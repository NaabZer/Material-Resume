import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Page.scss';

import { Card } from "@rmwc/card";
import { Icon } from '@rmwc/icon';

import DragAndDropGrid from '../DragAndDropGrid';
import ConfirmModal from '../../utility/ConfirmModal';
import PageModal from './PageModal';

import { removePage, changePageSettings } from '../../actions/components';

class Page extends React.Component {
  constructor(props){
    super(props)

    this.childGrids = []
    this.state = {deleteOpen: false, settingsOpen: false}
  }

  static propTypes = {
    componentdropcallback: PropTypes.func.isRequired,
    pageid: PropTypes.number.isRequired,
    componentid: PropTypes.number.isRequired,
  }


  saveSettings = (settings) => {
    this.setState({settingsOpen: false})
    this.props.changePageSettings(this.props.componentid, settings)
  }

  render(){
    const {componentdropcallback, settings, pageid, componentid, forwardedRef, ...props} = this.props;
    return(
      <div>
        <ConfirmModal 
          open={this.state.deleteOpen}
          text='Remove page?'
          subtitle='Are you sure?'
          cancelClickCallback={() => this.setState({deleteOpen: false})}
          confirmClickCallback={() => this.props.removePage(componentid)}
        />
        <PageModal 
          open={this.state.settingsOpen}
          settings={this.props.settings}
          pagenum = {pageid+1}
          cancelClickCallback={() => this.setState({settingsOpen: false})}
          confirmClickCallback={(settings) => this.saveSettings(settings)}
        />
        <h2 
          className='page-header'
          style={{display: this.props.onlyPage ? 'none' : 'inherit'}}
        >
          Page {pageid+1}
        </h2>
        <div
          style={{display: 'flex'}}
        >
          <div
            style={{
              height: '297mm',
              width: '210mm'
            }}
          >
            <Card
              className={this.props.onlyPage ? 'mdc-elevation--z0 page' : 'mdc-elevation--z8 page'}
              style={this.props.onlyPage ? {overflow: 'hidden'} : {}}
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
          <div 
            className='page-settings mdc-elevation--z4'
            style={{display: this.props.onlyPage ? 'none' : 'inherit'}}
          >
            <Icon 
              icon="delete"
              onClick={() => this.setState({deleteOpen: true})}
            />
            <Icon 
              icon="settings"
              onClick={() => this.setState({settingsOpen: true})}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  settings: state.components.pageSettings[props.componentid],
});

const mapDispatchToProps = dispatch => ({
  removePage: (id) => dispatch(removePage(id)),
  changePageSettings: (id, settings) => dispatch(changePageSettings(id, settings)),
});

const forwardedPage = React.forwardRef((props, ref) =>{
  return <Page {...props} forwardedRef={ref} />
});
export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(forwardedPage);
