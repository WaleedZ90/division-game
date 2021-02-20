import { SocketEvents } from 'enums';
import { Game, User } from 'models';
import React, { useEffect, useMemo, useReducer } from 'react';
import socket from 'socket';

import { GlobalActionTypes } from './consts';
import GlobalContext, { initialGlobalState } from './context/store.context';
import globalContextReducer from './context/store.reducer';
import { SetCurrentUser, SetCurrentGame } from './store-types';

const GlobalStateProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(globalContextReducer, initialGlobalState);

	useEffect(() => {
		socket.on(SocketEvents.Game, (game: Game) => {
			console.log('Game updates!', game);
			setCurrentGame(game);
		});
	}, []);

	const setCurrentGame: SetCurrentGame = (game: Game) => {
		dispatch({
			type: GlobalActionTypes.SET_CURRENT_GAME,
			payload: { game },
		});
	};

	const setCurrentUser: SetCurrentUser = (user: User) => {
		dispatch({
			type: GlobalActionTypes.SET_CURRENT_USER,
			payload: { user },
		});
	};

	const memoizedGlobalContextValue = useMemo(
		() => ({
			...state,
			setCurrentGame,
			setCurrentUser,
		}),
		[state]
	);

	return <GlobalContext.Provider value={memoizedGlobalContextValue}>{children}</GlobalContext.Provider>;
};

export default GlobalStateProvider;
