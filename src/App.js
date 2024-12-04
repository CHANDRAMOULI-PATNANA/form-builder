// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormEditor from './components/FormEditor';   // Import FormEditor component
import FormPreview from './components/FormPreview'; // Import FormPreview component

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Form Builder</h1>
        <Switch>
          {/* Route for the form editor */}
          <Route path="/" exact component={FormEditor} />
          
          {/* Route for the form preview (viewing a form based on an id) */}
          <Route path="/form/:id" component={FormPreview} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
