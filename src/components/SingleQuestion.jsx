function SingleQuestion(props) {
  const answersElements = props.allAnswers.map((answer, index) => {
    return (
      <button key={index} className="answer-btn">
        {answer}
      </button>
    );
  });

  return (
    <div className="question-container">
      <h1 className="question">{props.question}</h1>
      <div className="answers-btn-container">{answersElements}</div>
    </div>
  );
}

export default SingleQuestion;
