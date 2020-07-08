import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import * as serviceWorker from "./serviceWorker";
import { allCards, shuffle, duplicate, getSubset } from "./utils";
import { verifySaga } from "./sagas";
import "antd/dist/antd.css";
const sagaMiddleware = createSagaMiddleware();

function reducer(
  state = {
    size: 6, // Default size is 6
    cards: shuffle(duplicate(getSubset(allCards, 6))), // Array of all cards
    flipped: [], // Array of size 0-2 | Represents the indexes of cards currently flipped
    omitted: [], // Array of size 0-size*2 | represents the indexes of cards currently omitted
    attempts: 0, // Number representing the amount of attempts made
    finished: false, // Boolean representing if the game is over
  },
  action
) {
  console.log(action);
  if (action.type === "click") {
    if (state.flipped.includes(action.index))
      state = {
        ...state,
        flipped: state.flipped.filter((x) => x !== action.index),
      };
    else {
      state = { ...state, flipped: [...state.flipped, action.index] };
    }
  }
  if (action.type === "verify") {
    if (state.flipped.length % 2 === 0) {
      if (
        state.cards[state.flipped[state.flipped.length - 1]] ===
        state.cards[state.flipped[state.flipped.length - 2]]
      ) {
        state = {
          ...state,
          omitted: [
            ...state.omitted,
            state.flipped[state.flipped.length - 1],
            state.flipped[state.flipped.length - 2],
          ],
        };
      } else {
        state = {
          ...state,
          flipped: state.flipped.slice(0, -2),
          attempts: state.attempts + 1,
        };
      }
    }
  }
  if (action.type === "reset") {
    state = {
      ...state,
      cards: shuffle(duplicate(getSubset(allCards, state.size))),
      flipped: [],
      omitted: [],
      attempts: 0,
      finished: false,
    };
  }
  if (action.type === "resize") {
    state = {
      size: Number(action.size),
      cards: shuffle(duplicate(getSubset(allCards, Number(action.size)))),
      flipped: [],
      omitted: [],
      attempts: 0,
      finished: false,
    };
  }
  if (state.omitted.length === state.size * 2) state.finished = true;
  return state;
}

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
console.log(verifySaga);
sagaMiddleware.run(verifySaga);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
