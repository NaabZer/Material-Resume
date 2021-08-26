import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Typography } from '@rmwc/typography';

import Modal from '../Modal';
import { getComponentFromType, getSettingsFormFromType } from './components/ComponentFactory';
import { changeComponentSettings } from '../actions/components';
import { CommonSettingsForm } from './components/DraggableComponent';



class SettingsModal extends React.Component {
  constructor(props){
    super(props)

    this.formRef = React.createRef();
    this.commonFormRef = React.createRef();
  }

  back = (e) =>{
    e.preventDefault();
    const settings = {
      ...this.formRef.current.getSettings(),
      ...this.commonFormRef.current.getSettings()
    }

    this.props.changeComponentSettings(this.props.match.params.id, settings)
    this.props.history.goBack();
  }

  render(){
    const SettingsForm = getSettingsFormFromType(this.props.type);
    const Component = getComponentFromType(this.props.type);
    let {ignoreGap, elevation, ...componentSettings} = this.props.settings
    let generalSettings = {ignoreGap, elevation}

    return(
      <Modal
        open={true}
        backgroundClickCallback={e => this.back(e)}
      >
        <Typography
          use="headline4"
          style={{margin: '8px 0px'}}
        >
          {Component.Name}
        </Typography>
        <Typography
          style={{
            marginTop: '-8px',
            color: 'gray'
          }}
          use='body2'
        >
          Settings
        </Typography>
        <SettingsForm
          ref={this.formRef}
          settings={componentSettings}
          entries={this.props.entries}
        />
        <CommonSettingsForm
          ref={this.commonFormRef}
          settings={generalSettings}
        />
      </Modal>
    );
  }
}


const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return({
    settings: state.components.componentSettings[id],
    type: state.components.components[id].componentType,
    entries: state.entries
  })
}

const mapDispatchToProps = dispatch => ({
  changeComponentSettings: (id, settings) => dispatch(changeComponentSettings(id, settings)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsModal));
