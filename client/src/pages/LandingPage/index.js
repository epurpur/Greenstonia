import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_JOBS, QUERY_JOBAUTHOR } from '../../utils/queries';
import ActiveJobsCard from '../../components/ActiveJobsCard';
import { UserContext } from '../../utils/UserContext';


// css styles
import './styles.css';



const LandingPage = ()  => {

    const { userRole, setUserRole } = useContext(UserContext);

    const userId = localStorage.getItem('userId');

    //DB CALLS USING GRAPHQL AND APOLLO SERVER using USEQUERY HOOK
    const { loading, data:allJobsData } = useQuery(QUERY_JOBS);
    // add params jobAuthor to query
    const { loading:load, data:jobAuthorData } = useQuery(QUERY_JOBAUTHOR, {variables: {jobAuthor: userId}});
    
    // jobAuthorData && console.log('jobAuthorData', jobAuthorData.jobAuthor);

    const makeContractorJobCards = () => {
    // this gets all job data for currently logged in contractor. Makes HTML for each item in jobAuthorData
        console.log('***', jobAuthorData.jobAuthor)

        // if contractor has not created any jobs, return h1 tag, else return ActiveJobsCard for each job
        return jobAuthorData.jobAuthor.length == 0 ? 
        <h1>You have not created any jobs!</h1> : 
        jobAuthorData.jobAuthor.map((job) => 
        (
            <ActiveJobsCard 
                key={job._id}
                id={job._id}
                createdAt={job.createdAt}
                jobText={job.jobText}
                location={job.location}
                duration={job.duration}
                otherComments={job.otherComments}
                comments={job.comments}
            />
        ))
    }


    const makeActiveJobCards = () => {
        // this gets all jobs data from 'allJobsData' prop. Makes HTML for each item in allJobsData


        return  allJobsData.jobs.map((job) =>
        (
            <ActiveJobsCard
                key={job._id}
                id={job._id}
                createdAt={job.createdAt}
                jobText={job.jobText}
                location={job.location}
                duration={job.duration}
                otherComments={job.otherComments}
                comments={job.comments}
            /> 
        ))
    };
    
    const makeMyJobCards = () => {
    /**
     * Makes query to DB for all jobs.
     * Then filters out those jobs which the current user has commented (applied) for
     * returns job cards for just those jobs which the user has applied for
     */

        // gets id of currently logged in user
        const userId = localStorage.getItem('userId');

        // holds all jobs user has applied for
        const jobsAppliedFor = [];

        // gets data from query: QUERY_JOBS for all active jobs
        const jobsData = allJobsData.jobs;

        //maps over jobs and then comments for each job for those which the current user has applied for
        //pushes job of those that match to jobsAppliedFor
        jobsData && jobsData.map((job) => 
            job.comments.map((comment) =>
                userId == comment.commentAuthor && jobsAppliedFor.push(job)
            )
        )

        const uniqueJobs = jobsAppliedFor.reduce(function(a, b){
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
    
        // console.log('UNIQUE',uniqueJobs);

        return uniqueJobs.map((job) => (
                <ActiveJobsCard 
                    key={job._id}
                    id={job._id}
                    createdAt={job.createdAt}
                    jobText={job.jobText}
                    location={job.location}
                    duration={job.duration}
                    otherComments={job.otherComments}
                    comments={job.comments}
                /> 
        ))

    }

    return (
        <div>
            {/* Evaluate userRole if it is set to contractor or worker */}
            {userRole === '1' ? 
            
            <section id='contractorJobs'>
                <h1 id='contractorTitle'>Your Active Jobs</h1>
                <Link id='newJobButton' className='links' to='/NewJob' style={{ textDecoration: 'none' }}> Create New Job </Link>
                <p id='headerSubtitle'>(click job card to view job info and applicants)</p>
                    {/* make DB call to get jobAuthorData and get active jobs related to specific contractor */}
                    {/* Will then map over each job and render card here */}
                    {jobAuthorData && makeContractorJobCards()}
            </section>
            
            // else if userRole != 'contractor', userRole will be 'worker'
            : 
            <section id='contractorJobs'>
                <h1 id='contractorTitle'>View Jobs</h1>
                <p id='headerSubtitle'>(click job card to view more information)</p>
                    <div className='jobContainer'>
                        <div className="myJobCardsHolder">
                            <h1>Jobs You Have Applied For</h1>
                            {/* useQuery is asynchronous, so when allJobsData is available, then execute makeMyJobCards */}
                            {allJobsData && makeMyJobCards()}
                        </div>
                        
                        <div className="allJobCardsHolder">
                            <h1>All Active Jobs</h1>
                            {/* useQuery is asynchronous, so when allJobsData is available, then execute makeActiveJobCards */}
                            {allJobsData && makeActiveJobCards()}    
                        </div>
                    </div>
            </section>
            }
        </div>
    )
}

export default LandingPage;




