// ❗ You don't need to add extra action creators to achieve MVP

import * as actionTypes from "../state/action-types.js";
import axios from "axios";

export function moveClockwise() {
  return {
    type: actionTypes.MOVE_CLOCKWISE,
  };
}

export function moveCounterClockwise() {
  return {
    type: actionTypes.MOVE_COUNTERCLOCKWISE,
  };
}

export function selectAnswer(answer_id) {
  return {
    type: actionTypes.SET_SELECTED_ANSWER,
    payload: answer_id,
  };
}
export function setMessage(message) {
  return {
    type: actionTypes.SET_INFO_MESSAGE,
    payload: message,
  };
}
export function setQuiz() {}

export function inputChange(name, value) {
  return {
    type: actionTypes.INPUT_CHANGE,
    payload: { name, value },
  };
}

export function resetForm() {
  return {
    type: actionTypes.RESET_FORM,
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((response) => {
        dispatch({
          type: actionTypes.SET_QUIZ_INTO_STATE,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.SET_INFO_MESSAGE,
          payload: error.message,
        });
      });
  };
}

export function postAnswer(answer) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer", answer)
      .then((response) => {
        dispatch({ type: actionTypes.SET_SELECTED_ANSWER, payload: null });

        const messageFromApi = response.data.message;
        dispatch(setMessage(messageFromApi));

        dispatch(fetchQuiz());
      })
      .catch((error) => {
        dispatch(setMessage(error.message));
      });
  };
}

export function postQuiz(quiz) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/new", quiz)
      .then((response) => {
        const successMessage = `Congrats: "${response.data.question}" is a great question!`;

        dispatch({
          type: actionTypes.SET_INFO_MESSAGE,
          payload: successMessage,
        });

        dispatch({ type: actionTypes.RESET_FORM });
      })
      .catch((error) => {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
          type: actionTypes.SET_INFO_MESSAGE,
          payload: errorMessage,
        });
      });
  };
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
