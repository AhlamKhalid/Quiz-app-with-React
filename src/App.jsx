import React from "react";

import yellowBlob from "./assets/images/blobs-yellow.png";
import blueBlob from "./assets/images/blobs-blue.png";

import OpenScreen from "./components/OpenScreen";
import Questions from "./components/Questions";

function App() {
  const [showQuestions, setShowQuestions] = React.useState(false);

  return (
    <div>
      <img src={yellowBlob} className="blobs-yellow" />
      {showQuestions ? (
        <Questions />
      ) : (
        <OpenScreen setShowQuestions={setShowQuestions} />
      )}
      <img src={blueBlob} className="blobs-blue" />
    </div>
  );
}

export default App;
