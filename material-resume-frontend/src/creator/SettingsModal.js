import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Modal from '../Modal';
import { getComponentFromType, getSettingsFormFromType } from './components/ComponentFactory';
import { changeSettings } from '../actions/components';

import { Typography } from '@rmwc/typography';


class SettingsModal extends React.Component {
  constructor(props){
    super(props)

    this.formRef = React.createRef();
  }

  back = (e) =>{
    e.preventDefault();
    console.log(this.formRef.current.getSettings());
    this.props.changeSettings(this.props.match.params.id,
                              this.formRef.current.getSettings());
    this.props.history.goBack();
  }

  render(){
    const SettingsForm = getSettingsFormFromType(this.props.type);
    const Component = getComponentFromType(this.props.type);
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
          settings={this.props.settings}
          entries={this.props.entries}
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
  changeSettings: (id, settings) => dispatch(changeSettings(id, settings)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsModal));
