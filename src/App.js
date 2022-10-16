import React from 'react';
import './App.css';
import { JobsList, NewJobForm, Divider } from './components/Jobs';

function App() {

  return (
    <div className="App">
        <h1>Jobs</h1>
        <JobsList />
        <Divider />
        <NewJobForm />
    </div>
  );
}

export default App;
