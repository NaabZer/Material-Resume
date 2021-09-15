import React from 'react';

import { connect } from 'react-redux';
import { useLocation, Switch, Route, Redirect, matchPath} from 'react-router-dom';
import { DrawerAppContent } from '@rmwc/drawer';
import { ThemeProvider } from '@rmwc/theme';

import ResumePage from './creator/ResumePage.js';
import EntriesPage from './entries/EntriesPage';
import StartPage from './StartPage';
import SettingsPage from './SettingsPage';
import NavBar from './NavBar';
import LoginModal from './LoginModal';
import { THEME_BASELINE, getThemeOptions } from './utility/Themes';

import { getUser, getCSRFToken } from './actions/user';

function App(props) {
  let location = useLocation();
  let background = location.state && location.state.background;

  let backgroundOrLocation = background || location
  let inCreator = matchPath(backgroundOrLocation.pathname, {path: '/resumes/creator'}) !== null

  let theme = THEME_BASELINE
  if(props.user && props.user.setting_override_theme && props.components.resumeSettings.theme && inCreator){
    theme = props.components.resumeSettings.theme
  } else if(props.user){
    theme = props.user.setting_page_theme
  }

  if(!props.userObj.authenticated && !props.userObj.triedAuthentication){
    props.getCSRFToken();
    props.getUser();
  }


  return (
    <ThemeProvider
      options={getThemeOptions(theme)}
    >
      <div className="App">
        <NavBar location={location}/>
        <DrawerAppContent>
          <Switch location={background || location}> 
            <Route exact path='/' component={StartPage} />
            <Route path='/resumes' component={ResumePage} />
            <Route exact path='/entries'>
              <Redirect to='/entries/experience'/>
            </Route>
            <Route path='/entries/:type' component={EntriesPage} />
            <Route path='/settings' component={SettingsPage} />
          </Switch>

          {background && <Route path="/user/login" children={<LoginModal />} />}
          {background && <Route path="/user/register" children={<LoginModal is_register/>} />}

        </DrawerAppContent>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = state => ({
  components: state.components,
  user: state.user.user,
  userObj: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => 
    dispatch(getUser()),
  getCSRFToken: () => 
    dispatch(getCSRFToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
