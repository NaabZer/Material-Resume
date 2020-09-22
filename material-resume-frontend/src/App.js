import React from 'react';
import CreatorPage from './creator/CreatorPage';
import EntriesPage from './entries/EntriesPage';
import StartPage from './StartPage';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={StartPage} />
        <Route path='/creator' component={CreatorPage} />
        <Route exact path='/entries'>
          <Redirect to='/entries/experience'/>
        </Route>
        <Route path='/entries/:type' component={EntriesPage} />
      </Router>
    </div>
  );
}

export default App;
