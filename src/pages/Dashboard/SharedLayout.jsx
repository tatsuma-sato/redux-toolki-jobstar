import React from "react";
import { Outlet } from "react-router-dom";
import { BigSidebar, Navbar, SmallSidebar } from "../../components";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { useSelector } from "react-redux";

const SharedLayout = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <main className="dashboard">
        {isSidebarOpen && <SmallSidebar />}
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
