import { SocketEvents } from 'enums';
import { ErrorView, GameView, UserForm } from 'partials';
import React, { useContext, useEffect } from 'react';
import './App.scss';
import socket from 'socket';
import GlobalContext from 'store/context/store.context';
import { Button } from 'components';
import Filter3Icon from '@material-ui/icons/Filter3';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSocket } from 'hooks';

const App: React.FC = () => {
	const { currentGame, currentUser, setCurrentUser } = useContext(GlobalContext);
	const { startNewGame, leaveGame } = useSocket();

	useEffect(() => {
		return () => {
			socket.off(SocketEvents.Game);
			socket.emit(SocketEvents.Disconnet);
		};
	}, []);

	useEffect(() => {
		if (currentUser) startNewGame();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	if (!currentUser) {
		return (
			<div className="App">
				<div className="welcome-screen">
					<figure className="welcome-screen-logo">
						<Filter3Icon />
					</figure>
					<p className="welcome-screen-text">The Division Game</p>
					<UserForm onSubmit={setCurrentUser} />
				</div>
			</div>
		);
	}

	if (currentGame && !currentUser.isSingleUser && !currentGame.playerTwo) {
		return (
			<div className="App">
				<div className="waiting-screen">
					<h1>Waiting for another player to join!</h1>
					<CircularProgress className="spinner" />
					<Button color="secondary" onClick={leaveGame}>
						Leave queue
					</Button>
				</div>
			</div>
		);
	}

	if (currentGame && currentUser) {
		return (
			<div className="App">
				<GameView />
			</div>
		);
	}

	return (
		<div className="App">
			<ErrorView />
		</div>
	);
};

export default App;
