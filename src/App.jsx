import { useState, useEffect } from "react";
import he from 'he'
import "./App.css";
import Quiz from "./Quiz.jsx";

function App() {
  //State to render different page
  const [introView, setIntroView] = useState(true);
  const renderQuizPage = () => setIntroView(false);

  //State for storing questions and options
  const [questions, setQuestions] = useState([])
  useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
  },[])
  
  const quiz = questions.map((question)=>{
    return <Quiz key = {question.correct_answer} correct_answer = {question.correct_answer} incorrect_answers = {question.incorrect_answers} question = {he.decode(question.question)}/>
  })
  
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
