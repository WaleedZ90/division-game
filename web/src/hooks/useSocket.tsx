import { SocketEvents } from 'enums';
import { Attempt } from 'models';
import { useContext } from 'react';
import GlobalContext from 'store/context/store.context';
import socket from '../socket';

export const useSocket = () => {
	const { resetState, currentUser, currentGame } = useContext(GlobalContext);

	const startNewGame = () => {
		socket.emit(SocketEvents.NewGame, {
			user: currentUser,
			isSingleUser: currentUser?.isSingleUser,
			isBotGame: currentUser?.isBotGame,
		});
	};

	const performAttempt = (number: number) => {
		socket.emit(SocketEvents.Turn, { gameId: currentGame?.id, user: currentUser, number } as Attempt);
	};

	const leaveGame = () => {
		socket.emit(SocketEvents.Left);
		resetState();
	};

	return {
		startNewGame,
		performAttempt,
		leaveGame,
	};
};
