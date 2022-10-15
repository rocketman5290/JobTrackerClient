import React, { useState, useEffect} from 'react';
import axios from 'axios';

const JobsList = props => {
    useEffect(() => {
        axios.get('api/v1/jobs.json')
        .then(res => setJobs(res.data))
    }, []);

    const [jobs, setJobs] = useState([ ]);

    return(
        <div className='jobs-list'>
            { jobs.map( (job, index) => (
                 <div key={index}>
                    {job.company} | {job.position} | {job.description}
                </div>
            ))}
        </div>
    )
};
export default JobsList;