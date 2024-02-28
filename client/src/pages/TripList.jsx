import React from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const tripList = useSelector((state) => state?.user?.tripList);
  const userId = useSelector((state) => state?.user?._id);

  useEffect(() => {
    const getTripList = async () => {
      try {
        const response = await fetch(`/users/${userId}/trips`, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log("Fetch trip list failed:", error.message);
      }
    };
    getTripList();
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip list</h1>
      <div className="list"></div>
    </>
  );
};

export default TripList;
