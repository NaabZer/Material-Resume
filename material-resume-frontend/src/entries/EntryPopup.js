import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { Card, CardPrimaryAction} from "@rmwc/card";
import { Button } from '@rmwc/button';

import { editEntry, removeEntry } from '../actions/entries';

class EntryPopup extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const entry = this.props.entries[this.props.type][this.props.id]

    var expandedContent = Object.keys(entry).map((key, index) =>{
      return (
        <div>
          <b> {key} </b>
          <br/>
          {entry[key]}
        </div>
      );
    });
    if (this.props.type === 'text') {
      expandedContent = <div/>
    }

    return (
      <Card
        className={this.state.expanded ? 'entry entry-expanded' :
                                         'entry entry-contracted'}
      >
      </Card>
    )
  }
}
const mapStateToProps = state => ({
  entries: state.entries,
});

const mapDispatchToProps = dispatch => ({
  editEntry: (entryId, entryType, values) => 
    dispatch(editEntry(entryId, entryType, values)),
  removeEntry: (entryId, entryType) => 
    dispatch(removeEntry(entryId, entryType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
