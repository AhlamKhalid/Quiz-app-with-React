import React from "react";

// components
import SingleQuestion from "./SingleQuestion";

function Questions() {
  // questions returned from Trivia API
  const [questions, setQuestions] = React.useState([]);
  // mapping each question & its answers
  const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([]);
  // show warning if not all questions are answered
  const [showWarning, setShowWarning] = React.useState(false);
  // number of correct answers
  const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0);
  // show result
  const [showResult, setShowResult] = React.useState(false);

  React.useEffect(() => {
    // questions.length = 0 means first render & new game
    if (questions.length === 0) {
      fetch("https://opentdb.com/api.php?amount=5")
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.results);
          // each item in questionsAndAnswers will be an object of:
          /*
            -question
            -shuffled answers
            -correct answer
            -selected answer
          */
          setQuestionsAndAnswers(
            data.results.map((questionObject) => {
              return {
                question: questionObject.question,
                shuffledAnswers: shuffle([
                  ...questionObject.incorrect_answers,
                  questionObject.correct_answer
                ]),
                correctAnswer: questionObject.correct_answer,
                selectedAnswer: ""
              };
            })
          );
        });
    }
  }, [questions]);

  // function to shuffle answers
  // https://stackoverflow.com/a/2450976
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  }

  // choosing an answer
  function updateAnswer(currentQuestion, answer) {
    setQuestionsAndAnswers(
      questionsAndAnswers.map((questionObject) => {
        // if it is the question being answered, update its selected answer
        return questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject;
      })
    );
  }

  // clicking "check answers"
  function checkAnswers() {
    // find if some questions are not answered //

    // case 1: missing answers
    const notAllAnswered = questionsAndAnswers.some(
      (questionObject) => questionObject.selectedAnswer === ""
    );

    setShowWarning(notAllAnswered);

    // case 2: all questions have been answered
    if (!notAllAnswered) {
      questionsAndAnswers.forEach((questionObject) => {
        // compare selected answer & correct answer
        if (questionObject.selectedAnswer === questionObject.correctAnswer) {
          setNumCorrectAnswers(
            (prevNumCorrectAnswers) => prevNumCorrectAnswers + 1
          );
        }
      });

      // show result
      setShowResult(true);
    }
  }

  // play again
  function playAgain() {
    // reset state
    setQuestions([]);
    setQuestionsAndAnswers([]);
    setShowResult(false);
    setNumCorrectAnswers(0);
  }

  // questions elements
  const questionsElements = questionsAndAnswers.map((questionObject, index) => {
    return (
      <SingleQuestion
        key={index}
        question={questionObject.question}
        allAnswers={questionObject.shuffledAnswers}
        selectedAnswer={questionObject.selectedAnswer}
        correctAnswer={questionObject.correctAnswer}
        showResult={showResult}
        updateAnswer={updateAnswer}
      />
    );
  });

  return (
    <div>
      <div className="questions-container">{questionsElements}</div>

      <div className="text-center">
        {showWarning && (
          <p className="warning-message">
            There are questions not answered yet^
          </p>
        )}

        {/* questions.length > 0 means showing the button when the data is available */}
        {questions.length > 0 && !showResult ? (
          <button className="check-btn" onClick={checkAnswers}>
            Check answers
          </button>
        ) : null}
      </div>

      {showResult && (
        <div className="result-container">
          <p className="result-message">
            You scored {numCorrectAnswers}/5 correct answers
          </p>
          <button className="play-again-btn" onClick={playAgain}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default Questions;
