import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Link } from 'react-router-dom';

import { TabBar, Tab } from '@rmwc/tabs';
import { Card } from "@rmwc/card";
import { Button } from '@rmwc/button';

import Entry from './Entry';
import { createEntry } from '../actions/entries';
import EntryModal from './EntryModal';

const indexToType = [
  'experience',
  'text'
]

class EntriesPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {tabI: 0, lang: 'en', modalOpen: false}
  }

  editCallback = (id) => {
    this.props.history.push("/entries/edit/"+id)
  }

  render(){
    const entryType = indexToType[this.state.tabI];

    const entries = this.props.entries[entryType];
    const entryElems = Object.keys(entries).flatMap((key, index) =>{
      if (key === 'initial'){
        return null
      } else{
        return(
        <Entry 
          id={key} 
          key={this.state.tabI + key} 
          type={entryType}
          lang={this.state.lang}
          editCallback = {this.editCallback}
        />)
    }
    })

    return (
      <div
      >
        <Route exact path='/entries/new'>
          <EntryModal type={entryType} />
        </Route>
        <Route exact path='/entries/edit/:entryid'>
          <EntryModal type={entryType} />
        </Route>
        <Card
          style={{width: '60vw', margin: '8px auto'}}
        >
          <TabBar
            activeTabIndex={this.state.tabI}
              onActivate={evt => this.setState({tabI: evt.detail.index})}
            >
            <Tab>Experiences</Tab>
            <Tab>Text</Tab>
          </TabBar>
          <div
            style={{height: '100%'}}
          >
            <Link
              style={{color: 'white', textDecoration: 'none'}}
              to={{
                pathname:"/entries/new",
              }}
            >
              <Button
                raised
                style={{width: 'calc(100% - 16px)', height: '48px', margin: '8px'}}
              >
                New {entryType}
              </Button>
            </Link>
            {entryElems}
          </div>
        </Card>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  entries: state.entries,
});

const mapDispatchToProps = dispatch => ({
  createEntry: (entryType, values) => 
    dispatch(createEntry(entryType, values)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntriesPage));
