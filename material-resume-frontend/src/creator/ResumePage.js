import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Link, useLocation } from 'react-router-dom';

import { Card, CardPrimaryAction } from "@rmwc/card";
import { Button } from '@rmwc/button';

import { loadResumes } from '../actions/resumes';

class EntriesPageRouterUNC extends React.Component {
  render(){
    let location = this.props.location;
    console.log(location)
    console.log('render')
    return(
      <Switch location={location}>
        <Route exact path='/resumes' component={EntriesPage} />
      </Switch>
    )
  }
}

export default withRouter(EntriesPageRouterUNC);

class ResumeEntry extends React.Component {
  render(){
    return(
      <Card className='entry'>
        <CardPrimaryAction
          onClick={() => null}
        >
          <div className='entry-main-content'>
            <div className='entry-name'>
              {this.props.name}
            </div>
          </div>
        </CardPrimaryAction>
      </Card>
    );
  };
}

class EntriesPageUNC extends React.Component {
  render(){
    const resumes = this.props.resumes.resumes.map(resume => {
      return(
        <ResumeEntry key={resume.id} id={resume.id} name={resume.name} />
        );
    })

    return (
      <div
      >
        <Card
          style={{width: '60vw', margin: '8px auto'}}
        >
          <div
            style={{height: '100%'}}
          >
            <Link
              style={{color: 'white', textDecoration: 'none'}}
              to={{
                pathname:"/resume/new",
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
  resumes: state.resumes
});

const mapDispatchToProps = dispatch => ({
  loadResumes: () => dispatch(loadResumes()),

});

export const EntriesPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(EntriesPageUNC));
