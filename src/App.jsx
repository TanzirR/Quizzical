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
  //State for error handling
  const [error, setError] = useState(false);
  //State for score tracking
  const [score, setScore] = useState(0);

  //State for storing questions and options
  const [questions, setQuestions] = useState([]);

  //When check answer button is clicked
  function renderPlayAgainButton() {
    setPlayAgainButton(true);
    setAnswersChecked(true);

    // Calculate score by comparing selectedAnswers with correctAnswers
    let calculatedScore = 0;
    selectedAnswers.forEach((selectedAnswer, index) => {
      if (selectedAnswer === correctAnswers[index]) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
  }
  // Fetch questions (initial or replay)
  const fetchQuestions = () => {
    let showLoadingTimer = setTimeout(() => {
      setLoading(true);
    }, 1000);

    setError(false);

    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        clearTimeout(showLoadingTimer);
        setLoading(false);
        setQuestions(data.results);
        setPlayAgainButton(false);
        setAnswersChecked(false);
        setSelectedAnswers([]);
      })
      .catch((error) => {
        clearTimeout(showLoadingTimer);
        setLoading(false);
        setError(true);
        console.error("Error fetching questions:", error);
      });
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // New game function
  const newGame = () => {
    fetchQuestions();
  };

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
              key={`${question.question}-${index}`}
              correct_answer={question.correct_answer}
              incorrect_answers={question.incorrect_answers}
              question={he.decode(question.question)}
              questionIndex={index}
              onAnswerSelect={handleSelectedAnswers}
              showResults={answersChecked}
              selectedAnswer={selectedAnswers[index]}
              correctAnswer={he.decode(question.correct_answer)}
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
      ) : error ? (
        <div className="error-section">
          <h3>⚠️ Failed to load questions</h3>
          <p>Please check your connection or try again later.</p>
          <button onClick={newGame}>Retry</button>
        </div>
      ) : introView ? (
        <div className="intro-section">
          <h1 className="title">Quizzical</h1>
          <p>Check your knowledge on a wide range of topics</p>
          <button
            className="start-quiz-btn"
            onClick={() => setIntroView(false)}
          >
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
          {playAgainButton && (
            <div className="result">
              <h3>
                You scored {score}/{questions.length} correct answers
              </h3>
              <div className="btn-section">
                <button className="play-again-btn" onClick={newGame}>
                  Play Again
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
