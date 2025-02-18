// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from "redux";

import * as actionTypes from "./action-types.js";

const initialWheelState = 0;
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case actionTypes.MOVE_CLOCKWISE:
      return (state + 1) % 6;
    case actionTypes.MOVE_COUNTERCLOCKWISE:
      return (state - 1 + 6) % 6;
    default:
      return state;
  }
}

const initialQuizState = null;
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case actionTypes.SET_QUIZ_INTO_STATE:
      return action.payload;
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_ANSWER:
      return action.payload;
    default:
      return state;
  }
}

const initialMessageState = "";
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case actionTypes.SET_INFO_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: "",
  newTrueAnswer: "",
  newFalseAnswer: "",
};

function form(state = initialFormState, action) {
  switch (action.type) {
    case actionTypes.INPUT_CHANGE: {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case actionTypes.RESET_FORM: {
      return initialFormState;
    }
    default:
      return state;
  }
}

export default combineReducers({
  wheel,
  quiz,
  selectedAnswer,
  infoMessage,
  form,
});
