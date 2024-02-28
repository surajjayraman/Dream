import "../styles/ListingDetails.scss";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { facilities } from "../data.js";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const getListingDetails = async () => {
      try {
        const response = await fetch(`/properties/${listingId}`, {
          method: "GET",
        });
        const data = await response.json();
        setListing(data);
        setLoading(false);
      } catch (error) {
        console.log("Fetch listing details failed:", error.message);
      }
    };
    getListingDetails();
  }, [listingId]);

  // booking calendar
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)); // calculate the diff in days

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => {
            return (
              <img src={`${item.replace("public", "")}`} alt="property-pic" />
            );
          })}
        </div>
        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathRoomCount} bath(s)
        </p>
        <hr />
        <div className="profile">
          <img
            src={`${listing.creator.profileImagePath.repace("public", "")}`}
            alt="profile pic"
          ></img>
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.LastName}
          </h3>
        </div>
        <hr />
        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />
        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />
        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ${listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ${listing.price} x {dayCount} night
                </h2>
              )}

              <h2>Total price: ${listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button className="button" type="submit" onClick="">
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
