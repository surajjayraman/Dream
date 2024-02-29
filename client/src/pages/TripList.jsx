import React from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
const TripList = () => {
  const [loading, setLoading] = useState(true);
  const tripList = useSelector((state) => state?.user?.tripList);
  const userId = useSelector((state) => state?.user?._id);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTripList = async () => {
      try {
        const response = await fetch(`/users/${userId}/trips`, {
          method: "GET",
        });
        const data = await response.json();

        dispatch(setTripList(data));
        setLoading(false);
      } catch (error) {
        console.log("Fetch trip list failed:", error.message);
      }
    };
    getTripList();
  }, [dispatch, userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip list</h1>
      <div className="list">
        {tripList?.map(
          ({
            listingId,
            hostId,
            startDate,
            endDate,
            totalPrice,
            booking = true,
          }) => (
            <ListingCard
              listingId={listingId._id}
              creator={hostId}
              listingPhotoPaths={listingId.listingPhotoPaths}
              city={listingId.city}
              province={listingId.province}
              country={listingId.country}
              category={listingId.category}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
            />
          )
        )}
        </div>
        <Footer />
    </>
  );
};

export default TripList;
