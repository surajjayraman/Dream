import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/List.scss";
import { useSelector, useDispatch } from "react-redux";
import ListingCard from "../components/ListingCard";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const propertyList = useSelector((state) => state?.user?.propertyList);
  const userId = useSelector((state) => state?.user?._id);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPropertyList = async () => {
      try {
        const response = await fetch(`/users/${userId}/properties`, {
          method: "GET",
        });
        const data = await response.json();

        dispatch(setPropertyList(data));
        setLoading(false);
      } catch (error) {
        console.log("Fetch property list failed:", error.message);
      }
    };
    getPropertyList();
  }, [dispatch, userId]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div>
        <Navbar />
        <h1 className="title-list">Your Property list</h1>
        <div className="list">
          {propertyList?.map(
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
        <Footer />
    </>
  );
};

export default PropertyList;
