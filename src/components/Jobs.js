import React, { useState, useEffect} from 'react';
import axios from 'axios';
import qs from 'qs'

const Divider = () => {
    return(
        <div className="divider">
            <br>
            </br>
        </div>
    )
}



// const useAddJob = job => {
//         console.log(job)
        
//         axios.post('/api/v1/jobs', qs.stringify(
//             {
//               job:{
//                 company: job.company,
//                 position: job.position,
//                 description: job.description}
//             }))
//             .then(res=>( console.log(res)))
//             .catch( error => console.log(error))
// }

const NewJobForm = () => {
    const [formState, updateFormState] = useState({ company:'',
                                                    position:'',
                                                    description:''
})

    const [job, setJob ] = useState(formState)

    const addJob = job => {
        // console.log(formState)
        return (
            axios.post('/api/v1/jobs', qs.stringify(
                {
                job:{
                    company: job.company,
                    position: job.position,
                    description: job.description}
                }))
                .then(res => (console.log(res)))
                .catch( error => console.log(error))
            )
    }
        

    // const addJob = () => {
    //     console.log(formState)
    //     const qs = require('qs')
        
    //     axios.post('/api/v1/jobs', qs.stringify(
    //         {
    //           job:{
    //             company: formState.company,
    //             position: formState.position,
    //             description: formState.description}
    //         }))
    //         .then(res=>( console.log(res)))
    //         .catch( error => console.log(error))
    // }
    
    const handleInputChange = event => {
        const {name, value} = event.target
        setJob({...job, [name]: value})
        console.log(job)
    }

    return (
        <form onSubmit={event => {
          event.preventDefault()
          if (!job.company || !job.position || !job.description) return;
        //   props.addJob(job)
          setJob(formState)
          addJob(job)
        }}>
          <label>Company</label>
          <input type="text" name="company" value={job.company} onChange={handleInputChange} ></input>
          <label>Position</label>
          <input type="text" name="position" value={job.position} onChange={handleInputChange} ></input>
          <label>Description</label>
          <input type="text" name="description" value={job.description} onChange={handleInputChange} ></input>
          <button>Create Job</button>
        </form>
    )
}

const JobsList = () => {
    useEffect(() => {
        axios.get('api/v1/jobs.json')
        .then(res => setJobs(res.data))
    }, []);

    const [jobs, setJobs] = useState([]);

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
export {JobsList, NewJobForm, Divider};