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
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {navOpen: true}
  }
  render(){
    return(
      <React.Fragment>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarNavigationIcon
                icon="menu" 
                onClick={() => this.setState({navOpen: !this.state.navOpen})}
              />
              <TopAppBarTitle>All Features</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd>
              <TopAppBarActionItem icon="account_circle" />
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
        <Drawer dismissible open={this.props.open}>
          <DrawerHeader>
            <DrawerTitle>Material Resume Creator</DrawerTitle>
            <DrawerSubtitle>Navigation</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              <Link
                style={{color: 'white', textDecoration: 'none'}}
                to="/entries/experience"
              >
                <ListItem>Entries</ListItem>
              </Link>
              <Link
                style={{color: 'white', textDecoration: 'none'}}
                to="/creator"
              >
                <ListItem>Resume Creator</ListItem>
              </Link>
            </List>
          </DrawerContent>
        </Drawer>
      </React.Fragment>
    );
  }
}
