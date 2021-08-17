import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button } from '@rmwc/button';
import { Select } from '@rmwc/select';
import { Typography } from '@rmwc/typography';

import Modal from '../Modal';
import { THEMES, getThemeName } from '../utility/Themes';
import { changeResumeSettings } from '../actions/components'

class ResumeSettingsModal extends React.Component {
  constructor(props){
    super(props)

    this.state = {...this.props.settings}
  }

  back = (e) =>{
    e.preventDefault();
    this.props.history.goBack();
  }

  save = (e) => {
    e.preventDefault();
    this.props.changeResumeSettings(this.state)
    this.props.history.goBack();
  }

  render(){
    const themes = THEMES.map(theme => (
      {label: getThemeName(theme), value: theme}
    ), [])

    return(
      <Modal
        open={true}
        backgroundClickCallback={e => this.back(e)}
      >
        <Typography
          use="headline4"
          style={{margin: '8px 0px'}}
        >
          Resume
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
        <Select
          autoFocus
          style={{width: '100%'}}
          label='Theme'
          name='theme'
          value={this.state.theme}
          onChange={e => this.setState({theme: e.currentTarget.value})}
          options={themes}
        />
        <div
          style={{marginTop: '8px', display: 'flex', justifyContent:'space-between'}}
        >
          <Button
            raised
            style={{order:2}}
            onClick={this.save}
          >
            save
          </Button>
          <Button
            raised
            danger
            onClick={this.back}
            style={{order: '1'}}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.components.resumeSettings,
});

const mapDispatchToProps = dispatch => ({
  changeResumeSettings: (settings) => dispatch(changeResumeSettings(settings))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResumeSettingsModal));
