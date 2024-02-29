import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/List.scss";
import { useSelector, useDispatch } from "react-redux";
import ListingCard from "../components/ListingCard";
import { setReservationList } from "../redux/state";
import Loader from "../components/Loader";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const reservationList = useSelector((state) => state?.user?.reservationList);
  const userId = useSelector((state) => state?.user?._id);
  const dispatch = useDispatch();

  useEffect(() => {
    const getReservationList = async () => {
      try {
        const response = await fetch(`/users/${userId}/reservations`, {
          method: "GET",
        });
        const data = await response.json();

        dispatch(setReservationList(data));
        setLoading(false);
      } catch (error) {
        console.log("Fetch property list failed:", error.message);
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
              _id,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              price,
              creator,
              type,
              booking = false,
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                price={price}
                type={type}
                booking={booking}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationList;
