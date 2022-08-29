// to decode html entities
import { decode } from "html-entities";

function SingleQuestion(props) {
  // clicking an answer
  function clickAnswer(answer, currentQuestion) {
    // call updateAnswer prop
    props.updateAnswer(currentQuestion, answer);
  }

  // answers elements
  const answersElements = props.allAnswers.map((answer, index) => {
    return (
      // correct class: when answer = correct answer
      // incorrect class: when answer = user selected answer & it's incorrect answer
      // dimmed class: all answers except correct answer
      <button
        key={index}
        onClick={() => clickAnswer(answer, props.question)}
        className={`answer-btn ${
          answer === props.selectedAnswer ? "selected" : ""
        }
        ${props.showResult && answer === props.correctAnswer ? "correct" : ""}
        ${
          props.showResult &&
          answer === props.selectedAnswer &&
          answer !== props.correctAnswer
            ? "incorrect"
            : ""
        }
        ${props.showResult && answer !== props.correctAnswer ? "dimmed" : ""}
        `}
        disabled={props.showResult}
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
