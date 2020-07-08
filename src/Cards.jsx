import React from "react";
import { connect } from "react-redux";
import { Button, InputNumber, Form } from "antd";
import "./Cards.css";

function Cards({
  cards,
  onClick,
  flipped,
  omitted,
  attempts,
  finished,
  onChangeSize,
  onReset,
}) {
  const x = cards.length;
  return (
    <div>
      <p>Failed attempts: {attempts}</p>
      <div
        style={{
          margin: "auto",
          marginTop: 50,
          width: "90vw",
          display: "grid",
          justifyContent: "space-evenly",
          gridTemplateColumns: Array(x < 6 ? 5 : x < 12 ? 6 : x < 24 ? 6 : 10)
            .join()
            .split(",")
            .map((x) => "auto")
            .join(" "),
        }}
      >
        {cards.map((card, index) => (
          <div className="grid-item">
            <div
              className={
                "flip-card-inner" +
                " " +
                (flipped.includes(index) ? "flip-card-rotated" : "") +
                " " +
                (omitted.includes(index) ? "flip-card-omitted" : "")
              }
              onClick={() => !omitted.includes(index) && onClick(index)}
            >
              <div
                className="flip-card-front"
                style={{ top: (x < 20 ? 200 : 100) * index }}
              >
                <img
                  src="images/back.png"
                  width={x < 20 ? 200 : 100}
                  height={x < 20 ? 200 : 100}
                  alt="back"
                />
              </div>
              <div
                className="flip-card-back"
                style={{
                  top: (x < 20 ? 200 : 100) * index,
                  marginTop: -(x < 20 ? 200 : 100),
                }}
              >
                <img
                  className="image"
                  src={card}
                  width={x < 20 ? 200 : 100}
                  height={x < 20 ? 200 : 100}
                  alt={card.slice(7)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p>{finished && "Game over! Congratulations!!"}</p>
      <div>
        <label htmlFor="size" style={{ marginRight: 10 }}>
          Set size
        </label>
        <InputNumber id="size" style={{ marginRight: 10 }} />
        <Button
          type="primary"
          style={{ marginRight: 50 }}
          onClick={() => {
            onChangeSize(document.getElementById("size").value);
          }}
        >
          Validate
        </Button>
        <Button type="secondary" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
Cards.defaultProps = {
  flipped: [],
  omitted: [],
};
const mapStateToProps = ({ cards, flipped, omitted, finished, attempts }) => ({
  cards,
  flipped,
  omitted,
  finished,
  attempts,
});
const mapDispatchToProps = (dispatch) => ({
  onClick: (index) => dispatch({ type: "CLICK", index }),
  onChangeSize: (size) => dispatch({ type: "resize", size }),
  onReset: () => dispatch({ type: "reset" }),
});

const ProppedCards = connect(mapStateToProps, mapDispatchToProps)(Cards);

export default ProppedCards;
