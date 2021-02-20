import { Button } from './components';
import { SocketEvents } from 'enums';
import { Game, User } from 'models';
import { GameView, UserForm } from 'partials';
import React, { useEffect, useState } from 'react';
import './App.scss';
import socket from 'socket';

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

	if (currentGame && currentGame.winner) {
		const gameWinner = currentGame.winner === currentGame.playerOne.id ? currentGame.playerOne : currentGame.playerTwo;

		return (
			<div>
				<h1>{gameWinner.username} Wins!</h1>
				<Button
					onClick={() => {
						socket.emit(SocketEvents.NewGame, { user: currentUser, isSingleUser: currentUser.isSingleUser });
					}}
				>
					New game
				</Button>
			</div>
		);
	}

	if (currentGame && !currentUser.isSingleUser && !currentGame.playerTwo) {
		return <h1>Waiting for another player to join!</h1>;
	}

	if (currentGame && currentUser) {
		return <GameView game={currentGame} currentUser={currentUser} />;
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
