import React from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import { auth } from "../firebase/firebase";
import "../styles/dashboard.scss";

function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <Header user={user} />
      <div className="dashboard__body">
        <div className="dashboard__timline">
        <Timeline />
        </div>
        <div className="dashboard__sidebar">
          <p>This is side bar</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
