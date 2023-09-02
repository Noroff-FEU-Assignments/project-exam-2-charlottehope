import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Reactions = ({
  reactions,
  handleReact,
  clickedSymbols,
  id,
  handleOptionalReact,
  isPickerVisible,
  setPickerVisible,
}) => {
  const isClicked = (symbol) =>
    clickedSymbols.some((click) => click.symbol === symbol && click.id === id);

  return (
    <div className="d-flex reactions">
      {reactions.map(({ symbol, count }) => (
        <button
          key={symbol}
          onClick={() => handleReact(symbol)}
          disabled={isClicked(symbol)}
          className={isClicked(symbol) ? "clicked" : ""}
        >
          {symbol} {count}
        </button>
      ))}

      <div className="optional-emoji-container">
        <button onClick={() => setPickerVisible(!isPickerVisible)}>
          {isPickerVisible ? "x" : "+"}
        </button>

        {isPickerVisible && (
          <Picker data={data} onEmojiSelect={handleOptionalReact} />
        )}
      </div>
    </div>
  );
};

export default Reactions;
