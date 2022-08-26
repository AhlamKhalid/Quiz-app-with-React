import { decode } from "html-entities";

function SingleQuestion(props) {
  const answersElements = props.allAnswers.map((answer, index) => {
    return (
      <button key={index} className="answer-btn">
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
