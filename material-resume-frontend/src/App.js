import React from 'react';
import CreatorPage from './creator/CreatorPage';
import StartPage from './StartPage';
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={StartPage} />
        <Route path='/creator' component={CreatorPage} />
        <Route path='/entries' component={CreatorPage} />
      </Router>
    </div>
  );
}

export default App;
