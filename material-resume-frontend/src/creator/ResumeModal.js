import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Modal from '../Modal';
import { newResume } from '../actions/resumes';
import { Button } from '@rmwc/button';

import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import DjangoCSRFToken from 'django-react-csrftoken'


class ResumeModal extends React.Component {
  constructor(props){
    super(props)

    this.state = {name: ""}
  }

  submit = e =>{
    e.preventDefault();
    this.props.newResume(this.state.name)
      .then(response => {
        // close modal
        this.back(e);
      })
      .catch(err => {
        var errorMsg = err.response.data.non_field_errors
        console.log(errorMsg);
      })
  }
  back = (e) =>{
    e.preventDefault();
    this.props.history.goBack();
  }

  render(){
    return(
      <Modal
        open={true}
        backgroundClickCallback={e => this.back(e)}
      >
        <Typography
          use="headline4"
          style={{margin: '8px 0px'}}
        >
          Resume
        </Typography>
        <Typography
          style={{
            marginTop: '-8px',
            color: 'gray'
          }}
          use='body2'
        >
          New
        </Typography>
        <form onSubmit={this.submit}>
          <DjangoCSRFToken/>
          <TextField
            autoFocus
            style={{width: '100%'}}
            label='Name'
            name='name'
            value={this.state.name}
            onChange={e => this.setState({name: e.currentTarget.value})}
            onFocus={this.focusAll}
          >
          </TextField>
          <div
            ref={this.errorRef}
            style={{height: (this.state.hasError) ? this.errorRef.current.scrollHeight : 0}}
            className="modal-error"
          >
            <Typography
              use="headline8"
            >
              {this.state.error}
            </Typography>
          </div>
          <div
            style={{marginTop: '8px', display: 'flex', justifyContent:'space-between'}}
          >
            <Button
              raised
              type='submit'
              style={{order:2}}
            >
              Create
            </Button>
            <Button
              raised
              danger
              onClick={this.back}
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

const mapDispatchToProps = dispatch => ({
  newResume: (name) => dispatch(newResume(name)),
});


export default withRouter(connect(null, mapDispatchToProps)(ResumeModal));
