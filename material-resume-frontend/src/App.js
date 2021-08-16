import React from 'react';

import { connect } from 'react-redux';
import { useLocation, Switch, Route, Redirect} from 'react-router-dom';
import { DrawerAppContent } from '@rmwc/drawer';
import { ThemeProvider } from '@rmwc/theme';

import ResumePage from './creator/ResumePage.js';
import EntriesPage from './entries/EntriesPage';
import StartPage from './StartPage';
import NavBar from './NavBar';
import LoginModal from './LoginModal';
import { THEME_BASELINE, getThemeOptions } from './utility/Themes';

function App(props) {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <ThemeProvider
      options={getThemeOptions((props.resumeSettings && props.resumeSettings.theme) || THEME_BASELINE)}
    >
      <div className="App">
        <NavBar/>
        <DrawerAppContent>
          <Switch location={background || location}> 
            <Route exact path='/' component={StartPage} />
            <Route path='/resumes' component={ResumePage} />
            <Route exact path='/entries'>
              <Redirect to='/entries/experience'/>
            </Route>
            <Route path='/entries/:type' component={EntriesPage} />
          </Switch>

          {background && <Route path="/user/login" children={<LoginModal />} />}
          {background && <Route path="/user/register" children={<LoginModal is_register/>} />}

        </DrawerAppContent>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = state => ({
  resumeSettings: state.components.resumeSettings,
});

export default connect(mapStateToProps)(App);
