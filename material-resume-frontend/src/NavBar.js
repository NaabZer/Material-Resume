import React from 'react';

import {
  TopAppBar, 
  TopAppBarRow,
  TopAppBarTitle,
  TopAppBarSection,
  TopAppBarActionItem,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon
} from '@rmwc/top-app-bar';
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerSubtitle
} from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import { MenuSurface, MenuSurfaceAnchor } from '@rmwc/menu';
import { Typography } from '@rmwc/typography';
import { Icon } from '@rmwc/icon';
import { Theme } from '@rmwc/theme';
import { Link, withRouter } from 'react-router-dom';
import { Button } from '@rmwc/button';
import { connect } from 'react-redux';

import { logOut } from './actions/user';

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {navOpen: false}
  }
  render(){
    return(
      <React.Fragment>
        <TopAppBar style={{zIndex: 999}}>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarNavigationIcon
                icon="menu" 
                onClick={() => this.setState({navOpen: !this.state.navOpen})}
              />
              <TopAppBarTitle>All Features</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd>
              <AccountMenu/>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust />
        <NavDrawer open={this.state.navOpen}/>
      </React.Fragment>
    );
  }
}

class NavDrawer extends React.Component {
  render(){
    return(
      <React.Fragment>
        <Drawer 
          dismissible open={this.props.open}
          style={{backgroundColor: 'var(--mdc-theme-background)'}}
        >
          <DrawerHeader>
            <DrawerTitle>Material Resume Creator</DrawerTitle>
            <DrawerSubtitle>Navigation</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              <Link
                style={{textDecoration: 'none'}}
                to="/entries/experience"
              >
                <ListItem>Entries</ListItem>
              </Link>
              <Link
                style={{textDecoration: 'none'}}
                to="/resumes"
              >
                <ListItem>Resume Creator</ListItem>
              </Link>
              <Link
                style={{textDecoration: 'none'}}
                to="/settings"
              >
                <ListItem>Settings</ListItem>
              </Link>
            </List>
          </DrawerContent>
        </Drawer>
      </React.Fragment>
    );
  }
}

class AccountMenuUNC extends React.Component {
  constructor(props){
    super(props);

    this.state = {open: false}
  }

  closeCallback = e =>{
    this.setState({open: false})
  }

  render(){
    const user = this.props.user.user
    var AccountComponent = AccountMenuNotLoggedIn;
    if(user && Object.keys(user).length !== 0){
      AccountComponent = AccountMenuLoggedIn;
    }
    return(
      <React.Fragment>
        <MenuSurfaceAnchor>
          <MenuSurface 
            open={this.state.open} 
            onClose={() => this.setState({open: false})}
          >
            <div style={{ padding: '8px', minWidth: '240px'}}>
              <AccountComponent 
                user={user} 
                location={this.props.location}
                closeCallback={this.closeCallback}
                logOut={this.props.logOut}
              />
            </div>
          </MenuSurface>

          <TopAppBarActionItem 
            icon="account_circle"
            onClick={() => this.setState({open: true})}
          />
        </MenuSurfaceAnchor>
      </React.Fragment>
    );
  }
}

class AccountMenuNotLoggedIn extends React.Component {
  render(){
    const location = this.props.location;
    return(
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography use='headline5' style={{paddingBottom: '16px'}}>
          Not Logged In
        </Typography>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <Link
            to={{
              pathname: `/user/register`,
              state: { background: location }
            }}
          >
            <Button 
              raised
              onClick={this.props.closeCallback}
            >
              Register
            </Button>
          </Link>
          <Link
            to={{
              pathname: `/user/login`,
              state: { background: location }
            }}
          >
            <Button 
              raised
              onClick={this.props.closeCallback}
            >
              Log In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

}

class AccountMenuLoggedIn extends React.Component {
  logout = (e) =>{
    e.preventDefault();
    this.props.closeCallback();
    this.props.logOut();
  }
  render(){
    var UserImage = this.props.user.image
    if(!UserImage){
      UserImage = 
        <Theme
          use={['primaryBg']} wrap
        >
          <div
            style={{width: '100px', height: '100px', color: 'white'}}
          >
            <Icon icon='person' style={{fontSize: '100px'}}/>
          </div>
        </Theme>
    }
    return(
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{borderRadius: '50px', overflow: 'hidden'}}>
          {UserImage}
        </div>
        <Typography use='headline5' style={{paddingBottom: '16px', paddingTop: '8px'}}>
          {this.props.user.first_name + ' ' + this.props.user.last_name}
        </Typography>
        <Button 
          raised
          onClick={this.logout}
        >
          Log Out
        </Button>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  logOut: () => 
    dispatch(logOut()),
});

const mapStateToProps = state => ({
  user: state.user,
});

const AccountMenu = withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountMenuUNC));
