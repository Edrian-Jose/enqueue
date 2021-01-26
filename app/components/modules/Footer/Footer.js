import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.Footer}>
      <div className={styles.FooterContainer}>
        <div className={styles.FooterLeft}>
          <ul className={styles.QuickLinks}>
            <li>
              <a href="#" className={styles.AboutUsText}>
                <p>About Us</p>
              </a>
            </li>
            <li>
              <a href="#" className={styles.ContactUsText}>
                <p>Contact Us</p>
              </a>
            </li>
            <li>
              <a href="#" className={styles.TermsConditionText}>
                <p>Terms and Conditions</p>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.FooterRight}>
          <h6 className={styles.FollowUsText}>Follow Us</h6>
          <div className={styles.Socials}>
            <a href="#">
              <img
                src="/icons/facebook.svg"
                alt="@enquefacebookofficial"
                className={styles.SocialIcons}
              />
            </a>
            <a href="#">
              <img
                src="/icons/google-plus.svg"
                alt="@enquefacebookofficial"
                className={styles.SocialIcons}
              />
            </a>
            <a href="#">
              <img
                src="/icons/twitter.svg"
                alt="@enquefacebookofficial"
                className={styles.SocialIcons}
              />
            </a>
            <a href="#">
              <img
                src="/icons/linkedin.svg"
                alt="@enquefacebookofficial"
                className={styles.SocialIcons}
              />
            </a>
            <a href="#">
              <img
                src="/icons/whatsapp.svg"
                alt="@enquefacebookofficial"
                className={styles.SocialIcons}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
