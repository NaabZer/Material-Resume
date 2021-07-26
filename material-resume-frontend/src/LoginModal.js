import React from 'react';

import Modal from './Modal';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import '@rmwc/textfield/styles';

import DjangoCSRFToken from 'django-react-csrftoken'

import { logIn } from './actions/user';

// TODO: Add form validation
class LoginModal extends React.Component {
  constructor(props){
    super(props);

    this.formRef = React.createRef();
    this.errorRef = React.createRef()
    this.state = {hasError: false, error: ""}
  }

  submit = e =>{
    e.preventDefault();
    this.setState({hasError: false});
    const values = this.formRef.current.getValues();
    if(this.props.register){
    } else{
      this.props.logIn(values.username, values.password)
        .then(response => {
          // close modal
          this.props.history.goBack()
        })
        .catch(err => {
          console.log(this.errorRef.current.scrollHeight);
          var errorMsg = err.response.data.non_field_errors
          this.setState({hasError: true, error: errorMsg});
          //TODO: Ugly hack to make error render with correct size
          this.setState({error: errorMsg})
        });
    }
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
            <DjangoCSRFToken/>
            <Form
              ref={this.formRef}
            />
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
                disabled={this.props.user.isFetching}
              >
                {loginText}
              </Button>
              <Button
                raised
                danger
                onClick={this.back}
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
          label='Username'
          name='username'
          value={this.state.username}
          onChange={e => this.onChange('username', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          label='Password'
          name='password'
          type='password'
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
          autoFocus
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
          name='password1'
          type='password'
          value={this.state.password1}
          onChange={e => this.onChange('password1', e)}
          onFocus={this.focusAll}
        >
        </TextField>
        <TextField
          style={{width: '100%'}}
          label='Password Confirmation'
          name='password2'
          type='password'
          value={this.state.password2}
          onChange={e => this.onChange('password2', e)}
          onFocus={this.focusAll}
        >
        </TextField>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logIn: (username, password) => 
    dispatch(logIn(username, password)),
});

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginModal));
