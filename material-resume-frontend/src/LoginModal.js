import React from 'react';

import Modal from './Modal';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import '@rmwc/textfield/styles';

// TODO: Add form validation
class LoginModal extends React.Component {
  constructor(props){
    super(props);
  }

  submit = e =>{
    e.preventDefault();
  }

  back = (e) =>{
    e.preventDefault();
    this.props.history.goBack()
  }

  render(){
    var Form = LoginForm;
    var loginText = 'Log in';
    if(this.props.register){
      Form = RegistrationForm;
      loginText = 'Register';
    }
    return(
      <React.Fragment>
        <Modal 
          open={true}
          backgroundClickCallback={this.back}
        >
          <Typography
            use="headline4"
            style={{margin: '8px 0px'}}
          >
            {loginText}
          </Typography>
          <form onSubmit={this.submit}>
            <Form/>
            <div
              style={{marginTop: '8px', display: 'flex', justifyContent:'space-between'}}
            >
              <Button
                raised
                type='submit'
                style={{order:2}}
              >
                {loginText}
              </Button>
              <Button
                raised
                danger
                style={{order: '1'}}
              >
                cancel
              </Button>
            </div>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {username: '', password: ''};
  }

  onChange = (type, e) =>{
    this.setState({[type]: e.currentTarget.value});
  }

  getValues = () =>{
    return(this.state);
  }

  focusAll = (event) => event.target.select();

  render(){
    return(
      <div
        style={{width: '100%'}}
      >
        <TextField
          autoFocus
          style={{width: '100%'}}
          label='Email'
          name='email'
          value={this.state.email}
          onChange={e => this.onChange('email', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          label='Password'
          name='password'
          value={this.state.password}
          onChange={e => this.onChange('password', e)}
          onFocus={this.focusAll}
        >
        </TextField>
      </div>
    );
  }
}

class RegistrationForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {username: '', name: '', email:'', password: ''};
  }

  onChange = (type, e) =>{
    this.setState({[type]: e.currentTarget.value});
  }

  getValues = () =>{
    return(this.state);
  }

  focusAll = (event) => event.target.select();

  render(){
    return(
      <div
        style={{width: '100%'}}
      >
        <TextField
          autouocus
          style={{width: '100%'}}
          label='Username'
          name='username'
          value={this.state.username}
          onChange={e => this.onChange('username', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          label='Email'
          name='email'
          value={this.state.email}
          onChange={e => this.onChange('email', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          label='First Name'
          name='first_name'
          value={this.state.first_name}
          onChange={e => this.onChange('first_name', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          label='Last Name'
          name='last_name'
          value={this.state.last_name}
          onChange={e => this.onChange('last_name', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          label='Password'
          name='password'
          value={this.state.password}
          onChange={e => this.onChange('password', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          label='Password Confirmation'
          name='password_confirm'
          value={this.state.password_confirm}
          onChange={e => this.onChange('password_confirm', e)}
          onFocus={this.focusAll}
        >
        </TextField>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(LoginModal));
