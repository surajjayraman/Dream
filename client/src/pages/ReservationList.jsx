import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/List.scss";
import { useSelector, useDispatch } from "react-redux";
import ListingCard from "../components/ListingCard";
import { setReservationList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const reservationList = useSelector((state) => state?.user?.reservationList);
  const userId = useSelector((state) => state?.user?._id);
  const dispatch = useDispatch();

  useEffect(() => {
    const getReservationList = async () => {
      try {
        const response = await fetch(
          `https://dream-api-seven.vercel.app/users/${userId}/reservations`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        dispatch(setReservationList(data));
        setLoading(false);
      } catch (error) {
        console.log("Fetch reservation list failed:", error.message);
      }
    };
    getReservationList();
  }, [dispatch, userId]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div>
        <Navbar />
        <h1 className="title-list">Your Reservation list</h1>
        <div className="list">
          {reservationList?.map(
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
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
