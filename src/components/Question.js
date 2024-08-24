import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Create a timer that runs every 1 second
    const timerId = setTimeout(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          // Time is up
          onAnswered(false);
          // Reset timer for the next question
          return 10;
        } else {
          // Decrease time by 1 second
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup function to clear the timer
    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    // Reset timer for the next question
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
