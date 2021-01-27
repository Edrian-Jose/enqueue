import styles from "./LogButton.module.scss";

export default function LogButton({ icon, alt, text, textStyle, ...props }) {
  return (
    <span className={styles.logActionStyle}>
      <img src={icon} alt={alt} className={styles.logActionImgStyle} />
      <span style={textStyle} className={styles.logActionTextStyle}>{text}</span>
    </span>
  );
}
