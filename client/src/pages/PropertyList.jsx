import React from "react";
import Navbar from "../components/Navbar";
import "../styles/List.scss";

const PropertyList = () => {
  // Component logic goes here

  return (
    // JSX markup goes here
    <>
      <div>
        <Navbar />
        <h1 className="title-list">Your Property List</h1>
      </div>
    </>
  );
};

export default PropertyList;
