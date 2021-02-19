import { SocketEvents } from 'enums';
import { Game, User } from 'models';
import { GameView, UserForm } from 'partials';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.scss';

// TODO: Wrap the Url in environment variable
// TODO: create a hook for it to be re-usable
const socket = io.connect('http://localhost:4000');

const App: React.FC = () => {
	const [currentUser, setCurrentUser] = useState<User>();
	const [currentGame, setCurrentGame] = useState<Game>();

	useEffect(() => {
		socket.on(SocketEvents.Game, (game: Game) => {
			console.log('game created!', game);
			setCurrentGame(game);
		});

		return () => {
			socket.off(SocketEvents.Game);
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

	if (currentGame && currentUser) {
		return <GameView game={currentGame} currentUser={currentUser} />;
	}

	return (
		<div className="App">
			<h1>Something went wrong please refresh the page</h1>
		</div>
	);
};

export default App;
