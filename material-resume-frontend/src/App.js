import React from 'react';
import CreatorPage from './creator/CreatorPage';
import EntriesPage from './entries/EntriesPage';
import StartPage from './StartPage';
import NavBar from './NavBar';
import { useLocation, Switch, Route, Redirect} from 'react-router-dom';
import { DrawerAppContent } from '@rmwc/drawer';
import LoginModal from './LoginModal';

function App() {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <div className="App">
      <NavBar/>
      <DrawerAppContent>
        <Switch location={background || location}>
          <Route exact path='/' component={StartPage} />
          <Route path='/creator' component={CreatorPage} />
          <Route exact path='/entries'>
            <Redirect to='/entries/experience'/>
          </Route>
          <Route path='/entries/:type' component={EntriesPage} />
        </Switch>

        {background && <Route path="/user/login" children={<LoginModal />} />}
        {background && <Route path="/user/register" children={<LoginModal is_register/>} />}

      </DrawerAppContent>
    </div>
  );
}

export default App;
