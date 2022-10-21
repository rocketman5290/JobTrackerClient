import React, { useState} from 'react';
import axios from 'axios';
import qs from 'qs'

const NewJobForm = props => {
    const [formState] = useState({ company:'', position:'', description:''})

    const [job, setJob ] = useState(formState)

    const addJob = job => {
        return (
            axios.post('/api/v1/jobs', qs.stringify(
                {
                job:{
                    company: job.company,
                    position: job.position,
                    description: job.description}
                }))
                .then(res => {
                    console.log(res.data)
                    return props.setJobs([...props.jobs, job])
                })
                .catch( error => console.log(error))
            )
    }
    
    const handleInputChange = event => {
        const {name, value} = event.target
        console.log(name, value)
        setJob({...job, [name]: value})
    }

    return (
        <div className="addAndDeleteJobForm">
            <div>
                <form onSubmit={event => {
                    event.preventDefault()
                    if (!job.company || !job.position || !job.description) return;
                        setJob(formState)
                        addJob(job)
                }}>
                <label>Company</label>
                <input type="text" name="company" value={job.company} onChange={handleInputChange}></input>
                <label>Position</label>
                <input type="text" name="position" value={job.position} onChange={handleInputChange} ></input>
                <label>Description</label>
                <input type="text" name="description" value={job.description} onChange={handleInputChange} ></input>
                <button>Create Job</button>
                </form>
            </div>
        </div>

    )
}; //end of jobFormComponent

const JobsList = props => {
    // const [jobs, setJobs] = useState([]);

    // useEffect(() => {
    //     axios.get('api/v1/jobs.json')
    //     .then(res => setJobs(res.data))
    // }, []);

    const handleJobDelete = (_event, id) => {
        axios.delete("/api/v1/jobs/" + String(id))
            .then(res => props.setJobs(props.jobs.filter(job => job.id !== id )))
            .catch(error => console.log(error))
    }

    return(
        <div className='jobs-list'>
            { props.jobs.map( (job, index) => (
                <div key={index}>
                    <div className="jobDetails">
                        {job.company} | {job.position} | {job.description} 
                     </div>
                    <div className="deleteJobButton">
                        <button onClick={(event) => handleJobDelete(event, job.id)}>
                            Delete Job
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}; //end of JobListComponent

export {JobsList, NewJobForm};