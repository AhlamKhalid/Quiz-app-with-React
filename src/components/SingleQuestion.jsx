import { decode } from "html-entities";

function SingleQuestion(props) {
  function clickAnswer(answer, currentQuestion) {
    props.updateAnswer(currentQuestion, answer);
  }

  const answersElements = props.allAnswers.map((answer, index) => {
    return (
      <button
        key={index}
        onClick={() => clickAnswer(answer, props.question)}
        className={`answer-btn ${
          answer === props.selectedAnswer ? "selected" : ""
        }`}
      >
        {decode(answer)}
      </button>
    );
  });

  return (
    <div className="question-container">
      <h1 className="question">{decode(props.question)}</h1>
      <div className="answers-btn-container">{answersElements}</div>
    </div>
  );
}

export default SingleQuestion;
