import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { JobsList, NewJobForm } from './components/Jobs';

function App() {
  const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('api/v1/jobs.json')
        .then(res => setJobs(res.data))
    }, []);

  return (
    <div className="App">
        <h1>Jobs</h1>
        <JobsList jobs={jobs} setJobs={setJobs}/>
        <br></br>
        <NewJobForm jobs={jobs} setJobs={setJobs}/>
    </div>
  );
}

export default App;
