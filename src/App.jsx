import { useState, useEffect, useId } from "react";
import he from "he";
import "./App.css";
import Quiz from "./Quiz.jsx";

function App() {
  //State to render different page
  const [introView, setIntroView] = useState(true);
  const renderQuizPage = () => setIntroView(false);

  //State for storing questions and options
  const [questions, setQuestions] = useState([]);
  //useEffect Hook for fetching questions from opentdb API
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));
  }, []);
  //Array for storing correct answers
  const correctAnswers = [];

  //State for storing clicked answers
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  //Function to handle selected answers
  function handleSelectedAnswers(questionIndex, clickedOption) {
    setSelectedAnswers((prev) => {
      const newArray = [...prev]; // Create a copy of the previous array
      newArray[questionIndex] = clickedOption; // Update the specific question's answer
      return newArray;
    });
  }

  const quiz =
    questions && questions.length > 0
      ? questions.map((question, index) => {
          correctAnswers.push(he.decode(question.correct_answer));
          return (
            <Quiz
              key={index}
              correct_answer={question.correct_answer}
              incorrect_answers={question.incorrect_answers}
              question={he.decode(question.question)}
              questionIndex={index}
              onAnswerSelect={handleSelectedAnswers}
            />
          );
        })
      : [];
  console.log(selectedAnswers);
  return (
    <>
      {introView ? (
        <div className="intro-section">
          <h1 className="title">Quizzical</h1>
          <p>Check your knowledge on a wide range of topics</p>
          <button className="start-quiz-btn" onClick={renderQuizPage}>
            Start quiz
          </button>
        </div>
      ) : (
        <>
          {quiz}
          <div className="check-sec">
            <button className="check-btn">Check answers</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
