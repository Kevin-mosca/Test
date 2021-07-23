import './App.css';
import Main from './views/Main';
import { Router } from '@reach/router';
import "bootstrap/dist/css/bootstrap.min.css";
import Detail from './views/Detail';
import Update from './views/Update';
import Create from './views/Create';

import React from 'react';


function App() {
  return (
    <div className="App">
      <Router>
        <Main path="/pet" />
        <Create path="/pet/create" />
        <Detail path="/pet/:id" />
        <Update path="/pet/:id/edit"/>
      </Router>
    </div>
  );
}

export default App;
