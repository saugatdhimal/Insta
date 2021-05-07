import React from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import "../styles/dashboard.scss";
import Footer from '../components/footer'
function Dashboard({user}) {
  
  return (
    <div className="dashboard">
      <Header user={user}/>
      <div className="dashboard__body">
        <div className="dashboard__timline">
        <Timeline/>
        </div>
        <div className="dashboard__sidebar">
          <Sidebar/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
