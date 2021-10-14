import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { UserContext } from "../../utils/UserContext";
import { ADD_COMMENT, REMOVE_JOB } from "../../utils/mutations";
import { QUERY_USERS } from "../../utils/queries";
import WorkerCard from "../WorkerCard";
import { QUERY_JOBAUTHOR } from "../../utils/queries";

const SingleJobCard = () => {
  // use context
  const { userRole, setUserRole } = useContext(UserContext);

  // data passed in as state from ActiveJobsCard
  let data = useLocation();
  console.log("DATA AVAILABLE IN SINGLE CARD", data.state);

  //gets ID of current user
  const userId = localStorage.getItem("userId");

  // commentInfo set to ID of current job and id of currently logged in user
  // keeping commentText as empty string. In the future could use this for more
  const [commentInfo, setCommentInfo] = useState({
    jobId: data.state.id,
    commentText: "",
    commentAuthor: userId,
  });
  // executes ADD_COMMENT mutation
  const [applyComment, { error, data: CommentData }] = useMutation(ADD_COMMENT);

  const makeComment = async (event) => {
    try {
      // takes commentInfo data and executes addCommment mutation
      const { CommentData } = await applyComment({
        variables: { ...commentInfo },
      });
    } catch (e) {
      console.error(e);
    }

    alert("Your application has been submitted!");
  };

  // make state of alreadyApplied to evaluate whether user has applied for this job yet or not
  // use useEffect hook on render to check wither if user has applied. Default state is 'no' but sets to 'yes' if conditions are true
  const [alreadyApplied, setAlreadyApplied] = useState("no");

  useEffect(() => {
    if (
      data.state.comments &&
      data.state.comments.length > 0 &&
      data.state.comments[0].commentAuthor == userId
    ) {
      setAlreadyApplied("yes");
    }
  });

  // if there are applicants and the user logged in is a contractor, render list of cards for each individual user

  //1. get list of user IDs from comments
  const applicantIDs = [];

  if (data.state.comments && data.state.comments.length > 0) {
    data.state.comments.map((comment) => {
      applicantIDs.push(comment.commentAuthor);
    });
  }
  // result looks like this: ["61028b52653588fce83df4ef", "61028b19333e16fc7dad50df"]

  //2. get user data about all users in DB
  const { loading, data: allUsersData } = useQuery(QUERY_USERS);

  //applicantData holds object for each user that has applied
  const applicantData = [];

  //for all users in DB, check if user ID is in applicantIDs
  allUsersData &&
    allUsersData.users.map(
      (user) => applicantIDs.includes(user._id) && applicantData.push(user)
    );

  //3. Render card for each applicant
  console.log("APPLICANT DATA", applicantData);

  const makeWorkerCard = () => {
    // returns applicant card for all applicants for job. If no applicants, just returns 'No Applicants Found'

    if (applicantData.length > 0) {
      return applicantData.map((applicant) => (
        <WorkerCard
          key={applicant._id}
          username={applicant.username}
          email={applicant.email}
          phoneNumber={applicant.phoneNumber}
          description={applicant.description}
        />
      ));
    } else {
      return <h1>No one has applied yet!</h1>;
    }
  };

  //Delete Job button. executes REMOVE_JOB mutation
  const [removeJob, { removeJobError, data: removeJobData }] = useMutation(
    REMOVE_JOB,
    {
      variables: { jobId: data.state.id },
      refetchQueries: [
        { query: QUERY_JOBAUTHOR, variables: { jobAuthor: userId } },
      ],
    }
  );

  const deleteJob = () => {
    removeJob();
    alert("Job Deleted!");
  };

  return (
    <>
      {/* Render Delete Job button if user is contractor */}
      {userRole === "1" && (
        <Link to="/LandingPage" onClick={deleteJob}>
          <button id="deleteBtn">Delete Job</button>
        </Link>
      )}
      <Link to="/LandingPage" ><button id='backBtn'>Go Back</button></Link>
      <div id="singleJobCard">
        <div className="singleJobInfo">
          <p>Job Description:</p>
          <p> {data.state.jobText} </p>
        </div>
        <div className="singleJobInfo">
          <p>Location:</p>
          <p>{data.state.location}</p>
        </div>
        <div className="singleJobInfo">
          <p>Duration:</p>
          <p>{data.state.duration}</p>
        </div>
        <div className="singleJobInfo">
          <p>Other Comments:</p>
          <p>{data.state.otherComments}</p>
        </div>
        {/* Render 'apply for job' button conditionally if user is a worker */}
        {userRole === "2" && alreadyApplied === "no" && (
          <Link to="/LandingPage" onClick={makeComment}>
            <button id="applyBtn">Apply for Job</button>
          </Link>
        )}
        {alreadyApplied === "yes" && (
          <h1> You have already applied for this job! </h1>
        )}
      </div>
      {/* if user is a contractor, render the applicants in a list underneath the card */}
      {userRole === "1" && (
        <>
          <h1>Applicants</h1>
          <p>
            (It is the responsibility of the contractor to contact applicants)
          </p>
          {makeWorkerCard()}
        </>
      )}
    </>
  );
};

export default SingleJobCard;
