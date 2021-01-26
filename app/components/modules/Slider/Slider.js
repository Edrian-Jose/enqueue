import React, { useState, useEffect } from "react";
import styles from "./Slider.module.scss";

export default function Slider() {
  const slideImagesSrc = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesContainerStyle = {
    marginLeft: "-" + currentSlide * 100 + "vw",
  };

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide == slideImagesSrc.length - 1 ? 0 : currentSlide + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const slideButtons = slideImagesSrc.map((value, i) => {
    let classes = styles.sliderButton;

    if (i == currentSlide) {
      classes += " " + styles.active;
    }

    return (
      <div
        className={classes}
        key={"slideButton" + i}
            onClick={() => { setCurrentSlide(i) }}
      ></div>
    );
  });

  const slideImages = slideImagesSrc.map((value, i) => {
    return <img src={value} alt="SlideImage" key={"slideImage" + i} />;
  });

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderOverlay}>
        <div className={styles.sliderButtonsContainer}>{slideButtons}</div>
        <div className={styles.sliderOverlayContent}>
          <div className={styles.appTagline}>
            Best Business services are waiting for you
          </div>
          <div className={styles.appSubTagline}>
            Book your daily Scheme in over 1 Million business all over the
            Philippines
          </div>
          <div className={styles.getStartedButton}>{"Get Started >"}</div>
        </div>
      </div>
      <div className={styles.slidesContainer} style={slidesContainerStyle}>
        {slideImages}
      </div>
    </div>
  );
}
