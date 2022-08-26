import React from "react";

function Questions() {
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
      });
  }, []);

  return (
    <div>
      <h1>this is questions page</h1>
    </div>
  );
}

export default Questions;
