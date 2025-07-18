import { useState, useEffect, useId } from "react";
import he from "he";
import "./App.css";
import Quiz from "./Quiz.jsx";

function App() {
  //State to render different page
  const [introView, setIntroView] = useState(true);
  const renderQuizPage = () => setIntroView(false);

  //State for rendering play again button
  const [playAgainButton, setPlayAgainButton] = useState(false);
  //State to track if check answer button is clicked
  const [answersChecked, setAnswersChecked] = useState(false);
  //State for loading page while fetching questions
  const [loading, setLoading] = useState(false);

  //When check answer button is clicked
  function renderPlayAgainButton() {
    setPlayAgainButton(true);
    setAnswersChecked(true);
  }
  //Re-render the app when play again button is clicked
  function newGame() {
    // Wait 3 seconds before fetching new questions and resetting
    setLoading(true);
    setTimeout(() => {
      // Fetch new questions first
      fetch("https://opentdb.com/api.php?amount=5")
        .then((res) => res.json())
        .then((data) => {
          // Only reset states after new questions are successfully fetched
          setQuestions(data.results);
          setPlayAgainButton(false);
          setAnswersChecked(false);
          setSelectedAnswers([]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching new questions:", error);
          // Even on error, reset to allow retry
          setPlayAgainButton(false);
          setAnswersChecked(false);
          setSelectedAnswers([]);
          setLoading(false); // Hide loading even on error
        });
    }, 3000); // 3 second delay
  }

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
      {loading ? (
        <div className="loading-section">
          <h3>Loading...</h3>
        </div>
      ) : introView ? (
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
          {!answersChecked && (
            <div className="check-sec">
              <button className="check-btn" onClick={renderPlayAgainButton}>
                Check answers
              </button>
            </div>
          )}
          {playAgainButton ? (
            <div className="result">
              <h3>You have scored 5/5 correct answers</h3>
              <div className="btn-section">
                <button className="play-again-btn" onClick={newGame}>
                  Play Again
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default App;
