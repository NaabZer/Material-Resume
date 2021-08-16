import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Link } from 'react-router-dom';

import { Card, CardPrimaryAction } from "@rmwc/card";
import { Button } from '@rmwc/button';

import { loadResumes, deleteResume } from '../actions/resumes';
import { componentReset } from '../actions/components';
import CreatorPage from './CreatorPage';
import ResumeModal from './ResumeModal';

class EntriesPageRouterUNC extends React.Component {
  render(){
    let location = this.props.location;
    return(
      <Switch location={location}>
        <Route path='/resumes/creator/:id' component={CreatorPage} />
        <Route path='/resumes' component={EntriesPage} />
      </Switch>
    )
  }
}

export default withRouter(EntriesPageRouterUNC);

class ResumeEntry extends React.Component {
  deleteResume = (e) => {
    e.stopPropagation();
    this.props.deleteResume(this.props.id)
  }

  render(){
    return(
      <Card className='entry'>
        <CardPrimaryAction
          onClick={() => this.props.openResumeCallback(this.props.id)}
        >
          <div className='entry-main-content'>
            <div className='entry-name'>
              {this.props.name}
            </div>
            <Button
              raised
              danger
              onClick={this.deleteResume}
            >
              remove
            </Button>
          </div>
        </CardPrimaryAction>
      </Card>
    );
  };
}

class EntriesPageUNC extends React.Component {
  openResumeCallback = (id) => {
    if(id !== this.props.fetchedResume*1){
      this.props.componentReset();
    }
    this.props.history.push("/resumes/creator/" + id)
  }
  
  render(){
    const resumes = this.props.resumes.resumes.map(resume => {
      return(
        <ResumeEntry 
          key={resume.id} 
          id={resume.id} 
          name={resume.name} 
          history={this.props.history}
          deleteResume={this.props.deleteResume}
          openResumeCallback={this.openResumeCallback}
        />
        );
    })

    return (
      <div
      >
        <Route exact path='/resumes/new' component={ResumeModal} />
        <Card
          style={{width: '60vw', margin: '8px auto'}}
        >
          <div
            style={{height: '100%'}}
          >
            <Link
              style={{color: 'white', textDecoration: 'none'}}
              to={{
                pathname:"/resumes/new",
              }}
            >
              <Button
                raised
                style={{width: 'calc(100% - 16px)', height: '48px', margin: '8px'}}
              >
                New Resume
              </Button>
            </Link>
            <Button
              raised
              style={{width: 'calc(100% - 16px)', height: '48px', margin: '8px'}}
              onClick={() => this.props.loadResumes()}
            >
              Load
            </Button>
            {resumes}
          </div>
        </Card>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  resumes: state.resumes,
  fetchedResume: state.components.fetched
});

const mapDispatchToProps = dispatch => ({
  loadResumes: () => dispatch(loadResumes()),
  deleteResume: (id) => dispatch(deleteResume(id)),
  componentReset: () => dispatch(componentReset()),
});

export const EntriesPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(EntriesPageUNC));
