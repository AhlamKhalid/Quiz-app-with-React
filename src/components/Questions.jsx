import React from "react";

import SingleQuestion from "./SingleQuestion";

function Questions() {
  const [questions, setQuestions] = React.useState([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([]);
  const [showWarning, setShowWarning] = React.useState(false);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
        // each item will be an object of:
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
  }, []);

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

  function updateAnswer(currentQuestion, answer) {
    setQuestionsAndAnswers(
      questionsAndAnswers.map((questionObject) => {
        return questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject;
      })
    );
  }

  function checkAnswers() {
    const notAllAnswered = questionsAndAnswers.some(
      (questionObject) => questionObject.selectedAnswer === ""
    );

    setShowWarning(notAllAnswered);
  }

  const questionsElements = questionsAndAnswers.map((questionObject, index) => {
    return (
      <SingleQuestion
        key={index}
        question={questionObject.question}
        allAnswers={questionObject.shuffledAnswers}
        selectedAnswer={questionObject.selectedAnswer}
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

        {questions.length > 0 ? (
          <button className="check-btn" onClick={checkAnswers}>
            Check answers
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Questions;
