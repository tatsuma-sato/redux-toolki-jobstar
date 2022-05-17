import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import {
  clearValues,
  createJob,
  editJob,
  handleChange,
} from "../../features/job/jobSlice";

const AddJob = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditting,
    editJobId,
  } = useSelector((store) => store.job);

  useEffect(() => {
    if (!isEditting) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isEditting) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditting ? "edit job" : "Add job"}</h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            labelText="position"
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* jobLocation */}
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => {
                dispatch(clearValues());
              }}
            >
              Clear
            </button>
            <button className="btn btn-block submit-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
