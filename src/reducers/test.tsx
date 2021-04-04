import * as actionTypes from '@/actions/actionTypes'

export interface INewsItem{
	author_name: string
	category: string
	date: string
	is_content: string
	thumbnail_pic_s: string
	thumbnail_pic_s02: string
	thumbnail_pic_s03: string
	title: string
	uniquekey: string
	url: string
}

export interface IState{
  num: number,
	newsList: INewsItem[]
}

const initState: IState = {
	num: 5,
	newsList: []
};

interface IAction{
	type: string
	[prop: string]: any
}

export default function test(state = initState, action: IAction) {
	switch (action.type) {
		case actionTypes.TEST_NUM :
			return Object.assign({}, state, {num: state.num + 1});
		case actionTypes.GET_NEWS_LIST :
			return Object.assign({}, state, {newsList: action.listInfo});
		default :
			return state;
	}
}