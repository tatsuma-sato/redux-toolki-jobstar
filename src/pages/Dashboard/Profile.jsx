import React, { useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const disptch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error("Please fill out all fields");
      return;
    }
    disptch(updateUser(userData));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  // type,
  // name,
  // value,
  // handleChange,
  // labelText,
  // placeholder,

  return (
    <Wrapper>
      <form action="" className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            labelText="Name"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="lastName"
            value={userData.lastName}
            labelText="Last Name"
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            labelText="Email"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            labelText="Location"
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
