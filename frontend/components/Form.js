import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form({ formState, inputChange, postQuiz }) {
  const onChange = (evt) => {
    const { id, value } = evt.target;
    inputChange(id, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    postQuiz({
      question_text: formState.newQuestion.trim(),
      true_answer_text: formState.newTrueAnswer.trim(),
      false_answer_text: formState.newFalseAnswer.trim(),
    });
  };

  const allInputsValid =
    formState.newQuestion.trim().length > 1 &&
    formState.newTrueAnswer.trim().length > 1 &&
    formState.newFalseAnswer.trim().length > 1;

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        value={formState.newQuestion}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        value={formState.newTrueAnswer}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        value={formState.newFalseAnswer}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" disabled={!allInputsValid}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  formState: state.form,
});

const mapDispatchToProps = {
  inputChange: actionCreators.inputChange,
  postQuiz: actionCreators.postQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
