import * as actionTypes from '@/actions/actionTypes'

export interface IState{
  num: number
}

const initState: IState = {num: 5};

export default function test(state = initState, action: { type: any; }) {
	switch (action.type) {
		case actionTypes.TEST_NUM :
			return Object.assign({}, state, {num: state.num + 1});
		default :
			return state;
	}
}