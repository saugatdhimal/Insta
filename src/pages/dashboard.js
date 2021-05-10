import React, { useContext } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import "../styles/dashboard.scss";
import Footer from '../components/footer'
import UserContext from "../context/UserContext";
function Dashboard({user}) {
  const {
    user: { following},
  } = useContext(UserContext);
  return (
    <div className="dashboard">
      <Header user={user}/>
      <div className="dashboard__body">
        <div className="dashboard__timline">
        <Timeline/>
        </div>
        <div className="dashboard__sidebar">
          {following && following.length ? <Sidebar showUser/> : ''}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
