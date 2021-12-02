import { AxiosResponse } from "axios";
import { put, call, throttle } from "redux-saga/effects";
import {
  StoreActions,
  makeAuthenticationSuccess,
  makeAuthenticationFailure,
  getTweetsFailed,
  getTweetsSuccess,
} from "../actions";
import { authorizeUserAPI, getTweetsAPI } from "../api";

import { GET_TWEETS_REQUEST, MAKE_AUTH_REQUEST } from "../constants";
import { APIResponse, RequestTweetsPayload } from "../models";

function* authorizeUserSaga(action: StoreActions) {
  try {
    const response: AxiosResponse = yield call(
      authorizeUserAPI,
      action.payload as string
    );
    if (response.status === 200) {
      const data = response.data as APIResponse;
      if (data.success) {
        yield put(makeAuthenticationSuccess(data.data.url));
      } else {
        yield put(makeAuthenticationFailure());
      }
    } else {
      yield put(makeAuthenticationFailure());
    }
  } catch (err) {
    yield put(makeAuthenticationFailure());
    console.log(err);
  }
}

function* getTweetsSaga(action: StoreActions) {
  try {
    const response: AxiosResponse = yield call(
      getTweetsAPI,
      action.payload as RequestTweetsPayload
    );
    if (response.status === 200) {
      const data = response.data as APIResponse;
      if (data.success) {
        let parsed : Array<any> = data.data._realData as Array<any>
        yield put(getTweetsSuccess(parsed));
      } else {
        yield put(getTweetsFailed());
      }
    } else {
      yield put(getTweetsFailed());
    }
  } catch (err) {
    yield put(getTweetsFailed());
    console.log(err);
  }
}

export default function* defaultSaga() {
  yield throttle(5000, MAKE_AUTH_REQUEST, authorizeUserSaga);
  yield throttle(5000, GET_TWEETS_REQUEST, getTweetsSaga);
}
