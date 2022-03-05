function Label({ text }) {
  return (
    <div
      style={{
        fontWeight: "300",
        fontSize: "16px",
        lineheight: "19px",
        color: "#000000",
        marginBottom: "5px"
      }}
    >
      {text}
    </div>
  );
}

export default Label;
