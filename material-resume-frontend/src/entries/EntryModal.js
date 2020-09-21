import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Modal from '../Modal';
import { getEntryFormFromType } from './EntryForms';

import { Typography } from '@rmwc/typography';
import { Select } from '@rmwc/select';


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

  render(){
    var id = 'initial'
    if(this.props.match.params.entryid){
      id = this.props.match.params.entryid
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
              Work Experience
            </Typography>
            <Typography
              style={{
                marginTop: '-8px',
                color: 'gray'
              }}
              use='body2'
            >
              Edit entry
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
        <Form
          ref={this.formRef}
          entry={this.props.entries[this.props.type][id]}
          lang={this.state.lang}
        />
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
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryModal));
