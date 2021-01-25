export default function LogButton({ icon, alt, text, ...props }) {
  const logActionStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "1.125rem",
    textIndent: "0.5em",
    textTransform: "uppercase",
    margin: "0 1.3125rem",
  };

  const logActionImgStyle = {
    width: "1.11em",
    height: "1.11em",
  };
  return (
    <span style={logActionStyle}>
      <img src={icon} alt={alt} style={logActionImgStyle} />
      <span>{text}</span>
    </span>
  );
}
