import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Modal from '../Modal';
import { getEntryFormFromType } from './EntryForms';

import { editEntry, createEntry} from '../actions/entries';

import { Typography } from '@rmwc/typography';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';


class EntryModal extends React.Component {
  constructor(props){
    super(props)

    this.state = {open: false, lang_id: "0"}
    this.formRef = React.createRef();
  }

  back = (e) =>{
    e.preventDefault();
    this.props.history.goBack();
  }

  submit = (e) =>{
    e.preventDefault();
    const values = this.formRef.current.getValues();
    if(this.props.match.params.entryid){
      // If edit
      this.props.editEntry(this.props.match.params.entryid,
                           this.props.match.params.type,
                           values)
    } else{
      this.props.createEntry(this.props.match.params.type, values)
    }
    this.props.history.goBack();
  }

  _handleOnSubmit = (e) => {
    // If on last language, submit
    if (this.state.lang_id === (this.props.languages.length - 1).toString()) {
      console.log('last')
      this.submit(e);
    } else {
      console.log('not last')
      e.preventDefault();
      this.setState({lang_id: (parseInt(this.state.lang_id) + 1).toString()})
    }
  }


  render(){
    const { languages } = this.props;
    const type = this.props.match.params.type
    var uppercaseType = type.charAt(0).toUpperCase() + type.slice(1);
    var entryString = 'New'
    var formEntry = this.props.entries[type]['initial']
    if(this.props.match.params.entryid){
      entryString = 'Edit'
      formEntry = this.props.entries[type]['entries'][this.props.match.params.entryid]
    } else {
      formEntry.entries = Object.assign({}, ...languages.map(lang_obj => (
        {[lang_obj.language]: Object.assign({}, formEntry.entries['en'])}
      )));
    }
    const Form = getEntryFormFromType(type);

    const langOptions = languages.map((lang_obj, index) => (
      {
        label: lang_obj.language,
        value: index,
      }
    ))
    console.log(this.state.lang_id)
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
            options={langOptions} 
            value={this.state.lang_id}
            onChange={(e) => this.setState({lang_id: e.currentTarget.value})}
          />
        </div>
        <form onSubmit={(e) => this._handleOnSubmit(e)}>
          <Form
            ref={this.formRef}
            entry={formEntry}
            lang={languages[parseInt(this.state.lang_id)].language}
          />
          <div
            style={{marginTop: '8px', display: 'flex', justifyContent:'space-between'}}
          >
            {this.state.lang_id !== (this.props.languages.length - 1).toString() ?
              // Render next language with enter click as default if not at last language
              <React.Fragment>
                <Button
                  raised
                  type='submit'
                  style={{order: '3'}}
              >
                  Next language
                </Button>
                <Button
                  raised
                  type='button'
                  onClick={this.submit}
                  style={{order: '2'}}
                >
                  Save
                </Button>
              </React.Fragment>
              : // Else render only save button, as default press
              <React.Fragment>
                <Button
                  raised
                  type='submit'
                  style={{order: '2'}}
                >
                  Save
                </Button>
              </React.Fragment>
            }
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
  const languages = (state.user.user && state.user.user.languages) || [{language: 'en'}];
  return({
    entries: state.entries,
    languages: languages,
  })
}

const mapDispatchToProps = dispatch => ({
  createEntry: (entryType, values) => 
    dispatch(createEntry(entryType, values)),
  editEntry: (entryId, entryType, values) => 
    dispatch(editEntry(entryId, entryType, values)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryModal));
