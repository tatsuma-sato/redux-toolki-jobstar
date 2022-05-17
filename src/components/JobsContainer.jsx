import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import { getAllJobs } from "../features/allJobs/allJobsSlice";
import { Job, Loading } from "./index";

const JobsContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, jobs } = useSelector((store) => store.allJobs);

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  if (isLoading) return <Loading center />;

  if (jobs.length === 0)
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    );

  return (
    <Wrapper>
      <h5>Jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
