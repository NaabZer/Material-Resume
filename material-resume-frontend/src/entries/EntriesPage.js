import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Link } from 'react-router-dom';

import { TabBar, Tab } from '@rmwc/tabs';
import { Card } from "@rmwc/card";
import { Button } from '@rmwc/button';

import Entry from './Entry';
import { loadEntries } from '../actions/entries';
import EntryModal from './EntryModal';

var urljoin = require('url-join');

const indexToType = [
  'experience',
  'text'
]

function typeToIndex(index){
  switch(index){
    case 'experience': return 0;
    case 'text': return 1;
    default: return 0;
  }
}

class EntriesPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {lang_id: 0, modalOpen: false}
  }

  editCallback = (id) => {
    const currentUrl = this.props.location.pathname
    this.props.history.push(urljoin(currentUrl+"/edit/"+ id))
  }

  onTabSwitch = (e) => {
    const currentUrl = this.props.location.pathname
    const [_, entries, type, ...rest] = currentUrl.split("/")
    const newType = indexToType[e.detail.index]
    const newUrl = "/" +  urljoin(entries, newType, ...rest)
    this.props.history.replace(newUrl)
  }

  render(){
    const entryType = this.props.match.params.type
    if(!this.props.entries[entryType].fetched && !this.props.entries.isFetching){
      this.props.loadEntries(entryType);
    }

    const entries = this.props.entries[entryType]['entries'];
    const entryElems = Object.keys(entries).flatMap((key, index) =>{
      if (key === 'initial' || key === 'fetched'){
        return null
      } else{
        return(
        <Entry 
          id={key} 
          key={key} 
          type={entryType}
          lang={this.props.languages[this.state.lang_id].language}
          editCallback = {this.editCallback}
        />)
    }
    })

    return (
      <div
      >
        <Route exact path='/entries/:type/new'>
          <EntryModal/>
        </Route>
        <Route exact path='/entries/:type/edit/:entryid'>
          <EntryModal/>
        </Route>
        <Card
          style={{width: '60vw', margin: '8px auto'}}
        >
          <TabBar
            activeTabIndex={typeToIndex(entryType)}
              onActivate={e => this.onTabSwitch(e)}
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
                pathname:"/entries/" + entryType + "/new",
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
const mapStateToProps = state => {
  const languages = (state.user.user && state.user.user.languages) || [{language: 'en'}];
  return({
    entries: state.entries,
    languages: languages,
  })
};

const mapDispatchToProps = dispatch => ({
  loadEntries: (entryType) => 
    dispatch(loadEntries(entryType)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntriesPage));
