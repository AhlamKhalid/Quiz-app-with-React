function SingleQuestion() {
  const allAnswers = ["Virtus.pro", "Fnatic", "Team Liquid", "SK Gaming"];

  return (
    <div className="question-container">
      <h1 className="question">
        Which CS:GO eSports team won the major event ESL One Cologne 2016?
      </h1>
      <div className="answers-btn-container">
        {allAnswers.map((answer, index) => {
          return (
            <button className="answer-btn" key={index}>
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SingleQuestion;
