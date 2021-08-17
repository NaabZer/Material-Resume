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
          <div
            className='floating-resume-setting-text'
          >
            <Typography
              use='headline4'
            >
              Locale
            </Typography>
            <div
              style={{display: 'flex', marginTop: '-10px', marginLeft: '4px'}}
            >
              <Typography
                use='caption'
              >
                Sv
              </Typography>
              <Typography
                use='caption'
              >
                En
              </Typography>
            </div>
          </div>
        </div>
        <div 
          className='floating-resume-setting'
          onClick={() => this.props.history.push(this.props.match.params.id + "/settings")}
        >
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
