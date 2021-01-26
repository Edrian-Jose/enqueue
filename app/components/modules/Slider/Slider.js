import styles from "./Slider.module.scss";

export default function Slider() {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderOverlay}>
        <div className={styles.sliderButtonsContainer}>
          <div className={styles.sliderButton}></div>
          <div className={styles.sliderButton}></div>
          <div className={styles.sliderButton}></div>
          <div className={styles.sliderButton}></div>
        </div>
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
      <div className={styles.slidesContainer}>
        <img src="/images/1.jpg" alt="hello" />
        <img src="/images/2.jpg" alt="hello" />
        <img src="/images/3.jpg" alt="hello" />
        <img src="/images/4.jpg" alt="hello" />
      </div>
    </div>
  );
}
