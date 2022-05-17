import customFetch from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { logoutUser } from "../user/userSlice";
import { clearValues } from "./jobSlice";
import authHeader from "../../utils/authHeader";

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const res = await customFetch.post("/jobs", job, authHeader(thunkAPI));
    thunkAPI.dispatch(clearValues());
    return res.data;
  } catch (error) {
    // if (error.response.satus === 401) {
    //   thunkAPI.dispatch(logoutUser());
    //   return thunkAPI.rejectWithValue("Unauthorized Logging out...");
    // }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const res = await customFetch.delete(
      `/jobs/${jobId}`,
      authHeader(thunkAPI)
    );
    thunkAPI.dispatch(getAllJobs());
    return res.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
