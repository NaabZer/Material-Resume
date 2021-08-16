import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './FloatingResumeSettings.scss';

import { Icon } from '@rmwc/icon';
import '@rmwc/icon/styles';
import { Typography } from '@rmwc/typography';

class FloatingResumeSettings extends React.Component {
  render(){
    return (
      <div
        className='floating-resume-settings'
      >
        <div className='floating-resume-setting'>
          <Icon icon="language"/>
          <Typography
            use='headline4'
            className='floating-resume-setting-text'
          >
            Locale
          </Typography>
        </div>
        <div className='floating-resume-setting'>
          <Icon icon="settings"/>
          <Typography
            use='headline4'
            className='floating-resume-setting-text'
          >
            Settings
          </Typography>
        </div>
        <div className='floating-resume-setting'>
          <Icon icon="save"/>
          <Typography
            use='headline4'
            className='floating-resume-setting-text'
          >
            Save
          </Typography>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FloatingResumeSettings));
