import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './FloatingResumeSettings.scss';

import { Icon } from '@rmwc/icon';
import '@rmwc/icon/styles';
import { Typography } from '@rmwc/typography';
import { CircularProgress } from '@rmwc/circular-progress';

import { saveResume } from '../actions/components';
import LoadingIcon from '../utility/LoadingIcon';

class FloatingResumeSettings extends React.Component {

  clickSave = (e) => {
    console.log('clickclack')
    e.preventDefault()
    e.stopPropagation()
    this.props.saveResume(this.props.match.params.id, this.props.components)
  }

  render(){
    let loading = this.props.components.loading;
    let loadingTheme = loading ? 'text-disabled-on-dark' : 'on-primary'
    let pdfDownloading = this.props.pdfDownloading
    let pdfDownloadingTheme = pdfDownloading ? 'text-disabled-on-dark' : 'on-primary'
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
        <div 
          className={'floating-resume-setting ' + (loading ? 'floating-resume-setting-disabled':"")}
          onClick = {this.clickSave}
        >
          <LoadingIcon
            loading={loading}
            loadingTheme={loadingTheme}
            icon='save'
            size='medium'
          />
          <Typography
            use='headline4'
            theme={loadingTheme}
            className='floating-resume-setting-text'
          >
            Save
          </Typography>
        </div>
        <div 
          className={'floating-resume-setting ' + (pdfDownloading ? 'floating-resume-setting-disabled':"")}
          onClick={this.props.savePdfCallback}
        >
          <LoadingIcon
            loading={pdfDownloading}
            loadingTheme={pdfDownloadingTheme}
            icon='picture_as_pdf'
            size='medium'
          />
          <Typography
            className='floating-resume-setting-text'
            use='headline4'
            theme={pdfDownloadingTheme}
          >
            Download
          </Typography>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  components: state.components
});

const mapDispatchToProps = dispatch => ({
  saveResume: (resumeId, reduxComponents) => dispatch(saveResume(resumeId, reduxComponents)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FloatingResumeSettings));
