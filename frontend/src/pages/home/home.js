import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';





const HomePage = () => {
    // const navigate = useNavigate();

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     try{
    //         navigate("/getStarted");
    //     }catch(err){
    //         console.log(err);
    // };
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Discover a supportive learning community where you can connect, collaborate, and succeed together</h1>
        <h2>Find your <span className="highlight">study circle</span> here</h2>
        <Link to="/getStarted" className="get-started-button" >Get started</Link>
      </div>
      <div className="home-image">
        <img src="../assets/homephoto.jpg" alt="Study Circle" />
      </div>
    </div>
  );
};

export default HomePage;
