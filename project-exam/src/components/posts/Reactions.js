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
}) => (
  <div className="d-flex reactions">
    {reactions.map((reaction) => (
      <button
        key={reaction.symbol}
        onClick={() => handleReact(reaction.symbol)}
        disabled={clickedSymbols.some(
          (click) => click.symbol === reaction.symbol && click.id === id
        )}
        className={
          clickedSymbols.some(
            (click) => click.symbol === reaction.symbol && click.id === id
          )
            ? "clicked"
            : ""
        }
      >
        {reaction.symbol} {reaction.count}
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

export default Reactions;
