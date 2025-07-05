import { useState } from "react";
export default function Quiz() {
  const optionsArray = [
    { choice: "mercury", clicked: false },
    { choice: "venus", clicked: false },
    { choice: "mars", clicked: false },
    { choice: "saturn", clicked: false },
  ];

  //track which option is clicked
  const [clicked, setClicked] = useState(optionsArray);

  function handleClick(clickedOption) {
    setClicked((prev) =>
      prev.map(
        (option) =>
          option.choice === clickedOption
            ? { ...option, clicked: true }
            : { ...option, clicked: false } // Reset other options to false
      )
    );
  }

  const options = clicked.map((option, index) => {
    return (
      <button
        key={index}
        onClick={() => handleClick(option.choice)}
        style={{
          backgroundColor: option.clicked ? "#D6DBF5" : "transparent",
        }}
      >
        {option.choice}
      </button>
    );
  });
  return (
    <>
      <h1 className="question">
        What is the hottest planet in our solor system?
      </h1>
      <div className="options-btn-sec">{options}</div>
    </>
  );
}
