import { put, takeLeading } from "redux-saga/effects";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* handle({ index }) {
  yield put({ type: "click", index });
  yield delay(1000);
  yield put({ type: "verify", index });
}

export function* verifySaga(action) {
  yield takeLeading("CLICK", handle);
}
