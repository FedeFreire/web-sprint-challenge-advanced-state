import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  selectAnswer,
  postAnswer,
  fetchQuiz,
} from "../state/action-creators.js";

function Quiz({ quiz, selectedAnswer, selectAnswer, postAnswer, fetchQuiz }) {
  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  if (!quiz) {
    return "Loading next quiz...";
  }

  return (
    <div id="wrapper">
      <h2>{quiz.question}</h2>

      <div id="quizAnswers">
        {quiz.answers &&
          quiz.answers.map((answer) => (
            <div
              key={answer.answer_id}
              className={`answer ${
                selectedAnswer === answer.answer_id ? "selected" : ""
              }`}
            >
              {answer.text}
              <button onClick={() => selectAnswer(answer.answer_id)}>
                {selectedAnswer === answer.answer_id ? "SELECTED" : "Select"}
              </button>
            </div>
          ))}
      </div>

      <button
        id="submitAnswerBtn"
        onClick={() =>
          postAnswer({ quiz_id: quiz.quiz_id, answer_id: selectedAnswer })
        }
        disabled={!selectedAnswer}
      >
        Submit answer
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz,
  selectedAnswer: state.selectedAnswer,
});

const mapDispatchToProps = {
  selectAnswer,
  postAnswer,
  fetchQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
