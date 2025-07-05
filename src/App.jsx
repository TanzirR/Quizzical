import { useState } from "react";
import "./App.css";
import Quiz from "./Quiz.jsx";

function App() {
  //State to render different page
  const [introView, setIntroView] = useState(true);
  const renderQuizPage = () => setIntroView(false);

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
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
          <div className="check-sec">
            <button className="check-btn">Check answers</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
