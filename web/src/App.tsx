import { SocketEvents } from 'enums';
import { GameView, UserForm } from 'partials';
import React, { useContext, useEffect } from 'react';
import './App.scss';
import socket from 'socket';
import GlobalContext from 'store/context/store.context';

const App: React.FC = () => {
	const { currentGame, currentUser, setCurrentUser } = useContext(GlobalContext);

	useEffect(() => {
		return () => {
			socket.off(SocketEvents.Game);
			socket.emit(SocketEvents.Disconnet);
		};
	}, []);

	if (!currentUser) {
		return (
			<UserForm
				onSubmit={(user) => {
					setCurrentUser(user);
					socket.emit(SocketEvents.NewGame, { user: user, isSingleUser: user.isSingleUser });
				}}
			/>
		);
	}

	if (currentGame && !currentUser.isSingleUser && !currentGame.playerTwo) {
		return <h1>Waiting for another player to join!</h1>;
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
