//https://opentdb.com/api.php?amount=5
// {
//   "response_code": 0,
//   "results": [
//     {
//       "category": "...",
//       "type": "...",
//       "difficulty": "...",
//       "question": "What is ...?",
//       "correct_answer": "...",
//       "incorrect_answers": ["..."]
//     },
//     ...
//   ]
// }

import { useState } from "react";
import he from 'he'
export default function Quiz(props) {

  const storeOptions = [props.correct_answer, ...props.incorrect_answers]

  //Fisher-Yates Shuffle
  function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
  
  const optionsArray = shuffleArray(storeOptions.map((storeOption) => {
    return {choice: he.decode(storeOption), clicked: false}
  }))

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
        {props.question}
      </h1>
      <div className="options-btn-sec">{options}</div>
    </>
  );
}
