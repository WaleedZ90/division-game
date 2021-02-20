import { GlobalActionTypes } from 'store/consts';
import { GlobalContextReducer, GlobalState } from 'store/store-types';

const globalContextReducer: GlobalContextReducer = (state, action) => {
	let newState: GlobalState;
	switch (action.type) {
		case GlobalActionTypes.SET_CURRENT_GAME:
			const { game } = action.payload;
			newState = { ...state, currentGame: game };
			break;

		case GlobalActionTypes.SET_CURRENT_USER:
			const { user } = action.payload;
			newState = { ...state, currentUser: user };
			break;

		default:
			newState = state;
			break;
	}

	return newState;
};

export default globalContextReducer;
