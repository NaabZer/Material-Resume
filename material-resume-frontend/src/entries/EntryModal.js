import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Modal from '../Modal';
import { getEntryFormFromType } from './EntryForms';

import { editEntry, createEntry } from '../actions/entries';

import { Typography } from '@rmwc/typography';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';


class EntryModal extends React.Component {
  constructor(props){
    super(props)

    this.state = {open: false, lang: 'en'}
    this.formRef = React.createRef();
  }

  back = (e) =>{
    e.preventDefault();
    this.props.history.goBack();
  }

  submit = (e) =>{
    e.preventDefault();
    const {id, ...values} = this.formRef.current.getValues();
    console.log(values)
    if(this.props.match.params.entryid){
      // If edit
      
      this.props.editEntry(this.props.match.params.entryid,
                           this.props.type,
                           values)
    } else{
      this.props.createEntry(this.props.type, values)
    }
    this.props.history.goBack();
  }



  render(){
    var uppercaseType = this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1);
    var id = 'initial'
    var entryString = 'New'
    if(this.props.match.params.entryid){
      id = this.props.match.params.entryid
      entryString = 'Edit'
    }
    const Form = getEntryFormFromType(this.props.type);
    return(
      <Modal
        open={true}
        backgroundClickCallback={e => this.back(e)}
      >
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display:'flex', flexDirection: 'column'}}>
            <Typography
              use="headline4"
              style={{margin: '8px 0px'}}
            >
              {uppercaseType}
            </Typography>
            <Typography
              style={{
                marginTop: '-8px',
                color: 'gray'
              }}
              use='body2'
            >
              {entryString}
            </Typography>
          </div>
          <Select
            label="Language"
            enhanced
            options={['sv', 'en']} 
            value={this.state.lang}
            onChange={(e) => this.setState({lang: e.currentTarget.value})}
          />
        </div>
        <form onSubmit={(e) => this.submit(e)}>
          <Form
            ref={this.formRef}
            entry={this.props.entries[this.props.type][id]}
            lang={this.state.lang}
          />
          <div
            style={{marginTop: '8px', display: 'flex', justifyContent:'space-between'}}
          >
            <Button
              raised
              type='submit'
              style={{order: '2'}}
            >
              Save
            </Button>
            <Button
              raised
              danger
              type='button'
              onClick={e => this.back(e)}
              style={{order: '1'}}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
}


const mapStateToProps = (state, props) => {
  return({
    entries: state.entries
  })
}

const mapDispatchToProps = dispatch => ({
  createEntry: (entryType, values) => 
    dispatch(createEntry(entryType, values)),
  editEntry: (entryId, entryType, values) => 
    dispatch(editEntry(entryId, entryType, values)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryModal));
