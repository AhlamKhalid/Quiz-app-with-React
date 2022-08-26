import React from "react";

function Questions() {
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
        const firstQuestion = data.results[0];
        console.log(firstQuestion);
        const allAnswers = [
          ...firstQuestion.incorrect_answers,
          firstQuestion.correct_answer
        ];
        console.log(allAnswers);
        const shuffledAnswers = shuffle(allAnswers);
        console.log(shuffledAnswers);
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

  return (
    <div>
      <h1>this is questions page</h1>
    </div>
  );
}

export default Questions;
