import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'; // v5 not v6

import './App.css';
import Tabs from './components/Login/Tabs';
import Home from './components/Home/Home';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Tabs />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;