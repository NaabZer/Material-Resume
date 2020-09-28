import React from 'react';
import CreatorPage from './creator/CreatorPage';
import EntriesPage from './entries/EntriesPage';
import StartPage from './StartPage';
import NavBar from './NavBar';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { DrawerAppContent } from '@rmwc/drawer';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <DrawerAppContent>
            <Switch>
              <Route exact path='/' component={StartPage} />
              <Route path='/creator' component={CreatorPage} />
              <Route exact path='/entries'>
                <Redirect to='/entries/experience'/>
              </Route>
              <Route path='/entries/:type' component={EntriesPage} />
            </Switch>
        </DrawerAppContent>
      </Router>
    </div>
  );
}

export default App;
