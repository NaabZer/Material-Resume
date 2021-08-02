import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { TabBar, Tab } from '@rmwc/tabs';
import { Card, CardPrimaryAction} from "@rmwc/card";
import { Button } from '@rmwc/button';

import { removeEntry } from '../actions/entries';

import './Entry.scss';

class Entry extends React.Component {
  constructor(props){
    super(props);

    this.state = {expanded: false}
  }

  edit = (e) => {
    e.stopPropagation();
    this.props.editCallback(this.props.id);
  }

  render(){
    const entry = this.props.entries[this.props.type]['entries'][this.props.id]['entries'][this.props.lang]

    var titleText = '';
    if(this.props.type === 'experience'){
      titleText = entry.title + ' - ' + entry.location
    } else{
      titleText = entry.text
    }


    var expandedContent = Object.keys(entry).map((key, index) =>{
      return (
        <div
          key={key}
        >
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
        <CardPrimaryAction
          onClick={() => this.setState({expanded: !this.state.expanded})}
        >
          <div className='entry-main-content'>
            <div className='entry-name'>
              {titleText}
            </div>
            <Button
              onClick={(e) => this.edit(e)}
            >
              Edit
            </Button>
          </div>
          <div className='entry-expanded-content'>
            <div>
              {expandedContent}
              <div style={{height:'8px'}}/>
            </div>
            <div>
              <Button
                raised
                danger
                onClick={() => this.props.removeEntry(this.props.id, this.props.type)}
              >
                remove
              </Button>
              <div style={{height:'8px'}}/>
            </div>
          </div>
        </CardPrimaryAction>
      </Card>
    )
  }
}
const mapStateToProps = state => ({
  entries: state.entries,
});

const mapDispatchToProps = dispatch => ({
  removeEntry: (entryId, entryType) => 
    dispatch(removeEntry(entryId, entryType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
