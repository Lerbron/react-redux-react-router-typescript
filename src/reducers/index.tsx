import { combineReducers } from 'redux';

import test, {IState as ITestState} from './test';

export interface IState{
  test: ITestState
}

export default combineReducers({
  test,
})