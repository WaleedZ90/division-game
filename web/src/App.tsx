import { SocketEvents } from 'enums';
import { GameView, UserForm } from 'partials';
import React, { useContext, useEffect } from 'react';
import './App.scss';
import socket from 'socket';
import GlobalContext from 'store/context/store.context';
import { Button } from 'components';
import Filter3Icon from '@material-ui/icons/Filter3';
import CircularProgress from '@material-ui/core/CircularProgress';

const App: React.FC = () => {
	const { currentGame, currentUser, setCurrentUser, resetState } = useContext(GlobalContext);

	useEffect(() => {
		return () => {
			socket.off(SocketEvents.Game);
			socket.emit(SocketEvents.Disconnet);
		};
	}, []);

	if (!currentUser) {
		return (
			<div className="App">
				<div className="welcome-screen">
					<figure className="welcome-screen-logo">
						<Filter3Icon />
						<figcaption>The Division Game</figcaption>
					</figure>
					<UserForm
						onSubmit={(user) => {
							setCurrentUser(user);
							socket.emit(SocketEvents.NewGame, { user: user, isSingleUser: user.isSingleUser });
						}}
					/>
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
					<Button
						color="secondary"
						onClick={() => {
							socket.emit(SocketEvents.Left);
							resetState();
						}}
					>
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
			<h1>Something went wrong please refresh the page</h1>
			<code>Game: {JSON.stringify(currentGame)}</code>
			<code>User: {JSON.stringify(currentUser)}</code>
		</div>
	);
};

export default App;
