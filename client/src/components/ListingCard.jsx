import React from "react";
import "../styles/ListingCard.scss";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";

const ListingCard = (props) => {
  // slider for images
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(props.listingPhotoPaths.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentIndex === props.listingPhotoPaths.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {props.listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`${photo.replace("public", "")}`}
                alt={`property-pic ${index + 1}`}
              />
              <div className="prev-button" onClick={(e) => goToPrevSlide(e)}>
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div className="next-button" onClick={(e) => goToNextSlide(e)}>
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3>{`${props.city}, ${props.province}, ${props.country}`}</h3>
      <p>{props.category}</p>
      <p>{props.type}</p>
      <p>
        <span>${props.price}</span> per night
      </p>
    </div>
  );
};

export default ListingCard;
