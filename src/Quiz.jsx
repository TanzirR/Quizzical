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
import he from "he";
export default function Quiz(props) {
  const storeOptions = [props.correct_answer, ...props.incorrect_answers];

  //Fisher-Yates Shuffle
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const optionsArray = shuffleArray(
    storeOptions.map((storeOption) => {
      return { choice: he.decode(storeOption), clicked: false };
    })
  );

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

    // Call the parent's callback to store the selected answer
    if (props.onAnswerSelect) {
      props.onAnswerSelect(props.questionIndex, clickedOption);
    }
  }

  const options = clicked.map((option, index) => {
    let backgroundColor = "transparent";
    let opacity = 1;
    let border = "#4d5b9e solid 1px";

    if (props.showResults) {
      // Show results with colors
      if (option.choice === props.correctAnswer) {
        backgroundColor = "#94D7A2"; // Correct answer - green
        border = "none"; // Remove border for correct answer
      } else if (option.choice === props.selectedAnswer) {
        backgroundColor = "#F8BCBC"; // Wrong selected answer - red
        opacity = 0.5; // Reduce opacity for wrong answers
        border = "none"; // Remove border for selected wrong answer
      } else {
        // Unselected options - keep original border but reduce opacity
        opacity = 0.5;
        // border stays as "#4d5b9e solid 1px"
      }
    } else {
      // Normal state - show selection
      backgroundColor = option.clicked ? "#D6DBF5" : "transparent";
    }

    return (
      <button
        key={index}
        onClick={
          !props.showResults ? () => handleClick(option.choice) : undefined
        }
        style={{
          backgroundColor: backgroundColor,
          opacity: opacity,
          border: border,
          cursor: props.showResults ? "default" : "pointer",
        }}
      >
        {option.choice}
      </button>
    );
  });
  return (
    <>
      <h1 className="question">{props.question}</h1>
      <div className="options-btn-sec">{options}</div>
    </>
  );
}
