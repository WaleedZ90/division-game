import { Game, User } from 'models';
import { GlobalActionTypes } from './consts';

export interface BaseActionType {
	type: GlobalActionTypes;
	payload?: object;
}

export type SetCurrentGame = (game: Game) => void;
export type SetCurrentUser = (user: User) => void;
export type ResetState = () => void;

export interface GlobalState {
	currentGame: Game | null;
	currentUser: User | null;
}

export interface GlobalValues extends GlobalState {
	setCurrentGame: SetCurrentGame;
	setCurrentUser: SetCurrentUser;
	resetState: ResetState;
}

// ----- Actions -------
export interface SetCurrentGameAction extends BaseActionType {
	type: GlobalActionTypes.SET_CURRENT_GAME;
	payload: { game: Game };
}

export interface SetCurrentUserAction extends BaseActionType {
	type: GlobalActionTypes.SET_CURRENT_USER;
	payload: { user: User };
}

export interface ResetStateAction extends BaseActionType {
	type: GlobalActionTypes.RESET_STATE;
}

// ---- End of Actions -----

export type GlobalAction = SetCurrentGameAction | SetCurrentUserAction | ResetStateAction;
export type GlobalContextReducer = (state: GlobalState, action: GlobalAction) => GlobalState;
