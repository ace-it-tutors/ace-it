import { combineReducers } from 'redux';
const persistState = require('redux-localstorage');
import { ISearchState, searchReducer } from './search.reducer';
import { ILoginState, loginReducer } from './login.reducer';
import { ITeacherState, teacherReducer } from './teacher.reducer.ts';

export interface IAppState {
  counter?: number;
  search?: ISearchState;
  userID?: ILoginState;
  teacher?: ITeacherState;
  userData?: ILoginState;
};

export const rootReducer = combineReducers<IAppState>({
  search: searchReducer,
  login: loginReducer,
  teacher: teacherReducer
});

export const enhancers = [
  persistState('counter', { key: 'ng2-redux/examples/counter' })
];

